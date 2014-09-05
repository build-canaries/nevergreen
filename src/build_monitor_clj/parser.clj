(ns build-monitor-clj.parser
  (:require [clojure.xml :as xml]
            [clojure.string :refer [split join]]))

(defn sentanceize [input-string]
  (clojure.string/replace input-string #"[-_]+", " "))

(defn to-map [url]
  (xml/parse url))

(defn extract-name [name]
  (let [split-name (split name #"\s::\s")]
    {:name  (sentanceize (first split-name))
     :stage (second split-name)
     :job   (last split-name)}))

(defn extract-health [{:keys [lastBuildStatus activity]}]
  (cond
    (and (= lastBuildStatus "Success") (= activity "Sleeping")) {:prognosis "healthy"}
    (and (= lastBuildStatus "Success") (= activity "Building")) {:prognosis "healthy-building"}
    (and (= lastBuildStatus "Failure") (= activity "Sleeping")) {:prognosis "sick"}
    (and (= lastBuildStatus "Failure") (= activity "Building")) {:prognosis "sick-building"}
    :else {:prognosis "unknown"}))

(defn extract-attributes [data]
  (if (= (:tag data) :Project)
    (merge
      (:attrs data)
      (extract-name (get-in data [:attrs :name]))
      (extract-health (get-in data [:attrs])))))

(defn get-projects [url]
  (->> (:content (to-map url))
       (map #(extract-attributes %))
       (remove nil?)))

(defn get-interesting-projects [url]
  (filter (fn [{:keys [prognosis]}] (not= prognosis "healthy")) (get-projects url)))