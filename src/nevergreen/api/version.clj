(ns nevergreen.api.version
  (:require [clojure.data.json :as json])
  (:require [clojure.java.io :refer [resource]]))

(defn version []
  (let [v (json/read-str (slurp (resource "public/version.json")) :key-fn keyword)]
    (str (:version v) "+" (:versionMeta v) "." (:commitHash v))))
