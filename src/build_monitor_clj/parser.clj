(ns build-monitor-clj.parser
  (:require [clojure.xml :as xml]
            [clojure.string :refer [split]]))

(defn to-map [url]
  (xml/parse url))

(defn extract-name [name]
  (let [split-name (split name #"\s::\s")]
    {:name (first split-name) :pipeline (second split-name) :stage (last split-name)}))

(defn extract-attributes [data]
  (if (= (:tag data) :Project)
    (merge (:attrs data) (extract-name (get-in data [:attrs :name])))))

(defn get-projects [url]
  (let [content (:content (to-map url))]
    (remove nil? (map
                   #(extract-attributes %)
                   content))))
