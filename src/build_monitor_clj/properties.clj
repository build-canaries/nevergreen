(ns build-monitor-clj.properties
  (:require [clojure.string :refer [split trim]]
            [environ.core :refer [env]]))

(defn cctray-url []
  (env :cctray-url))

(defn included-projects []
  (map trim (split (env :included-projects) #",")))

(defn excluded-projects []
  (map trim (split (env :excluded-projects) #",")))