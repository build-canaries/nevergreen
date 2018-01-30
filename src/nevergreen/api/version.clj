(ns nevergreen.api.version
  (:require [clojure.string :refer [trim]]
            [clojure.tools.logging :as log]
            [clojure.java.io :refer [resource]]))

(defn- load-version []
  (trim (slurp (resource "version.txt"))))

(defn- load-meta []
  (trim (slurp (resource "version_meta.txt"))))

(defn- load []
  (str (load-version) "+" (load-meta)))

(defn version []
  (let [version (load)]
    (log/info version)
    version))
