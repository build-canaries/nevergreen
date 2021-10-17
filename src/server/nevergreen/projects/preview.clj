(ns nevergreen.projects.preview
  (:require [nevergreen.projects.projects :as projects]
            [clojure.java.io :as io]))

(defn preview [request]
  (binding [projects/*fetch* (fn [_] (io/input-stream (io/resource "preview.xml")))]
    (projects/get-projects request)))
