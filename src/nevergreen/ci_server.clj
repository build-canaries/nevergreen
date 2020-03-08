(ns nevergreen.ci-server
  (:require [clojure.test :refer :all]
            [clojure.set :refer [difference]]
            [clojure.string :as s]
            [clojure.string :refer [includes?]]
            [clj-cctray.util :refer [in?]])
  (:import (java.time Clock)))

(defn ^:dynamic now []
  (.instant (Clock/systemUTC)))

(defn- generate-project-id [project]
  (s/join "/" (remove nil? (map project [:unnormalised-owner :unnormalised-name :unnormalised-stage :unnormalised-job]))))

(defn- add-project-ids [projects]
  (map #(assoc % :project-id (generate-project-id %)) projects))

(defn- add-server-type [server-type projects]
  (map #(assoc % :server-type server-type) projects))

(defn- add-tray-id [tray-id projects]
  (map #(assoc % :tray-id tray-id) projects))

(defn- add-fetched-time [projects]
  (map #(assoc % :fetched-time (now)) projects))

(defn- add-is-new [seen projects]
  (let [new-project-ids (difference (set (map :project-id projects)) (set seen))]
    (map #(assoc % :is-new (or (in? new-project-ids (:project-id %)) false)) projects)))

(defn- detect-server [url]
  (cond
    (nil? url) nil
    (includes? url "/go/") :go
    (includes? url "//circleci.com") :circle
    :else :unknown))

(defn- unknown-server? [server-type]
  (not (in? [:go :circle] server-type)))

(defn enrich-projects [{:keys [server-type tray-id url seen]} projects]
  (->>
    (add-project-ids projects)
    (add-server-type server-type)
    (add-tray-id tray-id)
    (add-fetched-time)
    (add-is-new seen)))

(defn get-server-type [{:keys [server-type url]}]
  (let [server-keyword (keyword server-type)]
    (if (unknown-server? server-keyword)
      (detect-server url)
      server-keyword)))
