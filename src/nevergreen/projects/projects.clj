(ns nevergreen.projects.projects
  (:require [clj-cctray.filtering :as filtering]
            [clj-cctray.util :refer [in?]]
            [clj-cctray.core :as parser]
            [nevergreen.errors :as err]
            [nevergreen.projects.ci-gateway :as ci-gateway]
            [nevergreen.projects.ci-server :as ci-server]
            [clojure.string :as s]
            [clojure.set :refer [difference]])
  (:import (org.xml.sax SAXParseException)))

(def ^:private ui-required-keys [:description
                                 :is-new
                                 :last-build-Label
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

(defn ^:dynamic fetch [tray]
  (ci-gateway/fetch-cctray tray))

(defn ^:dynamic parse [source options]
  (parser/get-projects source options))

(defn ^:dynamic enrich [tray projects]
  (ci-server/enrich-projects tray projects))

(defn- filter-by-ids [included ids projects]
  (if (nil? included)
    projects
    (filter #(in? ids (:project-id %)) projects)))

(defn- filter-jobs [projects]
  (filter #(s/blank? (:job %)) projects))

(defn- filter-projects [prognosis projects]
  (if (nil? prognosis)
    (filter-jobs projects)
    (filtering/by-prognosis (map keyword prognosis)
                            (filter-jobs projects))))

(defn- handle-parsing-exception [e]
  (let [exceptionMessage (.getMessage e)]
    (if (instance? SAXParseException e)
      (if (= exceptionMessage "Content is not allowed in prolog.")
        "Response is not XML, is the URL pointing to the CCTray XML feed?"
        (str "XML is invalid. " exceptionMessage))
      e)))

(defn- to-projects [{:keys [url tray-id] :as feed}]
  (try
    (with-open [response (fetch feed)]
      (parse response {:server (ci-server/get-server-type feed) :normalise true}))
    (catch Exception e
      [(assoc
         (err/create-error (handle-parsing-exception e) url)
         :tray-id tray-id)])))

(defn- to-projects-filtered [{:keys [included include-new seen] :as feed} prognosis]
  (if (and (not (nil? included)) (empty? included) (false? include-new))
    []
    (let [projects (to-projects feed)]
      (if (every? err/is-error? projects)
        projects
        (let [filtered-projects (filter-projects prognosis projects)
              enriched-projects (enrich feed filtered-projects)
              returned-project-ids (map :project-id enriched-projects)
              new-project-ids (difference (set returned-project-ids) (set seen))
              include-project-ids (if (true? include-new)
                                    (concat included new-project-ids)
                                    included)
              projects-to-return (filter-by-ids included include-project-ids enriched-projects)]
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
