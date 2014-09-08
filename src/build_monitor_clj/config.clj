(ns build-monitor-clj.config
  (:require [clojure.string :refer [split trim]]
            [environ.core :refer [env]]))

(defn- split-string [s]
  (if s
    (set (map trim (split s #",")))
    #{}))

(defn port []
  (Integer. (or (env :port) 5000)))

(defn cctray-url []
  (env :cctray-url))

(defn included-projects []
  (split-string (or (env :included-projects) ".*")))

(defn excluded-projects []
  (split-string (env :excluded-projects)))