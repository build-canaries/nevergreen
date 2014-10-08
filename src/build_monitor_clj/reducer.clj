(ns build-monitor-clj.reducer
  (:import (java.util.regex Pattern))
  (:require [build-monitor-clj.config :refer :all]))

(def priorities ["sick-building" "sick" "healthy-building" "healthy" "unknown"])

(defn prognosis [project]
  (.indexOf priorities (:prognosis project)))

(defn find-most-interesting-projects [grouped-projects]
  (->> grouped-projects
       (map (fn [[name projects]] [name (sort-by prognosis projects)]))
       (map (fn [[_ projects]] (first projects)))))

(defn has-a-healthy-building-project? [projects]
  (not (empty?
         (filter (fn [project] (= "healthy-building" (:prognosis project))) projects))))

(defn aggregate [projects]
  (let [grouped-projects (group-by (fn [project] (:name project)) projects)
        most-interesting (find-most-interesting-projects grouped-projects)]
    (map (fn [project]
           (if (and (= "sick" (:prognosis project))
                    (has-a-healthy-building-project? (get grouped-projects (:name project))))
             (assoc project :prognosis "sick-building")
             project))
         most-interesting)))

(defn- name-matches [regex project]
  (re-matches (Pattern/compile regex) (:raw-name project)))

(defn include-whitelisted-projects [projects]
  (filter #(some (fn [regex] (name-matches regex %)) (included-projects)) projects))

(defn filter-blacklisted-projects [projects]
  (filter #(not-any? (fn [regex] (name-matches regex %)) (excluded-projects)) projects))

(defn show-selected-projects [projects]
  (->> (aggregate projects)
       (include-whitelisted-projects)
       (filter-blacklisted-projects)))
