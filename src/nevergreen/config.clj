(ns nevergreen.config
  (:require [clojure.string :refer [split trim]]
            [environ.core :refer [env]]))

(defn- split-string [s]
  (if s
    (set (map trim (split s #",")))
    #{}))

(defn port []
  (Integer. (or (env :port) 5000)))
