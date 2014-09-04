(ns build-monitor-clj.properties
  (:require [clojure.string :refer [split]]))

(defn env [name]
  (System/getenv name))

(defn cctray-url []
  (env "CCTRAY_URL"))

(defn included-projects []
  (split (env "INCLUDED_PROJECTS") #","))