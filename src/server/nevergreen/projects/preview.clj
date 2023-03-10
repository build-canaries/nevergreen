(ns nevergreen.projects.preview
  (:require [clojure.java.io :as io]
            [nevergreen.errors :as errors]
            [nevergreen.projects.projects :as projects]))

(defn preview [request]
  (binding [projects/*fetch* (fn [_] (io/input-stream (io/resource "preview.xml")))]
    (conj (projects/get-projects request)
            (errors/create-error "Example error", "https://github.com/build-canaries/nevergreen"))))
