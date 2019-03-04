(ns nevergreen.api.projects
  (:require [clj-cctray.filtering :as filtering]
            [clj-cctray.util :refer [in?]]
            [clj-cctray.core :as parser]
            [nevergreen.errors :as err]
            [nevergreen.ci-gateway :as ci-gateway]
            [nevergreen.ci-server :as ci-server])
  (:import (org.xml.sax SAXParseException)))

(defn ^:dynamic fetch [tray]
  (ci-gateway/fetch-cctray tray))

(defn ^:dynamic parse [source options]
  (parser/get-projects source options))

(defn ^:dynamic enrich [tray projects]
  (ci-server/enrich-projects tray projects))

(defn- filter-by-ids [ids projects]
  (if (nil? ids)
    projects
    (filter #(in? ids (:project-id %)) projects)))

(defn- handle-parsing-exception [e]
  (let [exceptionMessage (.getMessage e)]
    (if (instance? SAXParseException e)
      (if (= exceptionMessage "Content is not allowed in prolog.")
        "Response is not XML, is the URL pointing to the CCTray XML feed?"
        (str "XML is invalid. " exceptionMessage))
      e)))

(defn- to-projects [{:keys [url tray-id] :as tray}]
  (try
    (with-open [response (fetch tray)]
      (parse response {:server (ci-server/get-server-type tray) :normalise true}))
    (catch Exception e
      [(assoc
         (err/create-error (handle-parsing-exception e) url)
         :tray-id tray-id)])))

(defn- to-projects-filtered [{:keys [included] :as tray} prognosis]
  (if (and (not (nil? included)) (empty? included))
    []
    (let [projects (to-projects tray)]
      (if (every? err/is-error? projects)
        projects
        (->>
          (enrich tray projects)
          (filtering/by-prognosis prognosis)
          (filter-by-ids included))))))

(defn get-projects [trays prognosis]
  (if (= (count trays) 1)
    (to-projects-filtered (first trays) prognosis)
    (flatten (pmap #(to-projects-filtered % prognosis) trays))))

(defn get-all [trays]
  (get-projects trays [:healthy :sick :healthy-building :sick-building :unknown]))

(defn get-interesting [trays]
  (get-projects trays [:sick :healthy-building :sick-building :unknown]))
