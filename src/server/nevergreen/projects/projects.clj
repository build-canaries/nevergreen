(ns nevergreen.projects.projects
  (:require [clj-cctray.core :as parser]
            [clj-cctray.filtering :as filtering]
            [clj-cctray.util :refer [in?]]
            [clojure.string :as s]
            [nevergreen.errors :as err]
            [nevergreen.projects.ci-gateway :as ci-gateway]
            [nevergreen.projects.ci-server :as ci-server])
  (:import (java.io Closeable)
           (org.xml.sax SAXParseException)))

(def ^:private ui-required-keys [:description
                                 :last-build-label
                                 :prognosis
                                 :project-id
                                 :server-type
                                 :timestamp
                                 :tray-id
                                 :web-url])

(def ^:private prognosis-priority [:error
                                   :sick
                                   :sick-building
                                   :healthy-building
                                   :unknown
                                   :healthy])

(defn ^:dynamic ^Closeable *fetch* [feed]
  (ci-gateway/fetch-cctray feed))

(defn ^:dynamic *parse* [source options]
  (parser/get-projects source options))

(defn ^:dynamic *enrich* [feed projects]
  (ci-server/enrich-projects feed projects))

(defn- filter-by-ids [included projects]
  (if (nil? included)
    projects
    (filter #(in? included (:project-id %)) projects)))

(defn- filter-jobs [projects]
  (filter #(s/blank? (:job %)) projects))

(defn- filter-projects [prognosis projects]
  (if (nil? prognosis)
    (filter-jobs projects)
    (filtering/by-prognosis (map keyword prognosis)
                            (filter-jobs projects))))

(defn- handle-parsing-exception [^Exception e]
  (let [exceptionMessage (.getMessage e)]
    (if (instance? SAXParseException e)
      (if (= exceptionMessage "Content is not allowed in prolog.")
        "Response is not XML, is the URL pointing to the CCTray XML feed?"
        (str "XML is invalid. " exceptionMessage))
      e)))

(defn- to-projects [{:keys [url tray-id] :as feed}]
  (try
    (with-open [response (*fetch* feed)]
      (*parse* response {:server (ci-server/get-server-type feed) :normalise true}))
    (catch Exception e
      [(assoc
         (err/create-error (handle-parsing-exception e) url)
         :tray-id tray-id)])))

(defn- to-projects-filtered [{:keys [included] :as feed} prognosis]
  (if (and (not (nil? included)) (empty? included))
    []
    (let [projects (to-projects feed)]
      (if (every? err/is-error? projects)
        projects
        (let [filtered-projects (filter-projects prognosis projects)
              enriched-projects (*enrich* feed filtered-projects)
              projects-to-return (filter-by-ids included enriched-projects)]
          (map #(select-keys % ui-required-keys) projects-to-return))))))

(defn- sort-projects [projects sort]
  (cond
    (s/blank? sort) projects
    (= (keyword sort) :description) (sort-by :description projects)
    (= (keyword sort) :timestamp) (reverse (sort-by :timestamp projects))
    (= (keyword sort) :prognosis) (sort-by #((into {}
                                                   (map-indexed (fn [i e] [e i])
                                                                prognosis-priority))
                                             (:prognosis %))
                                           projects)
    :else projects))

(defn get-projects [{:keys [feeds prognosis sort]}]
  (let [projects
        (if (= (count feeds) 1)
          (to-projects-filtered (first feeds) prognosis)
          (flatten (pmap #(to-projects-filtered % prognosis) feeds)))]
    (sort-projects projects sort)))
