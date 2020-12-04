(ns nevergreen.projects.ci-server
  (:require [clojure.test :refer :all]
            [clojure.set :refer [difference]]
            [clojure.string :as s]
            [clojure.string :refer [includes?]]
            [clj-cctray.util :refer [in?]])
  (:import (java.time Clock)))

(defn ^:dynamic now []
  (.instant (Clock/systemUTC)))

(defn- is-building [project]
  (in? [:sick-building :healthy-building] (:prognosis project)))

(defn- not-blank [str]
  (not (s/blank? str)))

(defn- str-from-keys [separator map keys]
  (s/join separator (filter not-blank (vals (select-keys map keys)))))

(defn- generate-project-id [project]
  (str-from-keys "/" project [:unnormalised-owner :unnormalised-name :unnormalised-stage :unnormalised-job]))

(defn- add-project-id [project]
  (assoc project :project-id (generate-project-id project)))

(defn- add-description [project]
  (assoc project :description (str-from-keys " " project [:name :stage])))

(defn- add-server-type [server-type project]
  (assoc project :server-type server-type))

(defn- add-tray-id [tray-id project]
  (assoc project :tray-id tray-id))

(defn- add-timestamp [project]
  (assoc project :timestamp (if (is-building project)
                              (now)
                              (:last-build-time project))))

(defn- add-is-new [new-project-ids project]
  (assoc project :is-new (or (in? new-project-ids (:project-id project)) false)))

(defn- detect-server [url]
  (cond
    (nil? url) nil
    (includes? url "/go/") :go
    (includes? url "//circleci.com") :circle
    :else :unknown))

(defn- unknown-server? [server-type]
  (not (in? [:go :circle] server-type)))

(defn enrich-projects [{:keys [server-type tray-id seen]} projects]
  (let [project-with-ids (map add-project-id projects)
        new-project-ids (difference (set (map :project-id project-with-ids))
                                    (set seen))]
    (map #(->>
            (add-description %)
            (add-server-type server-type)
            (add-tray-id tray-id)
            (add-timestamp)
            (add-is-new new-project-ids))
         project-with-ids)))

(defn get-server-type [{:keys [server-type url]}]
  (let [server-keyword (keyword server-type)]
    (if (unknown-server? server-keyword)
      (detect-server url)
      server-keyword)))
