(ns build-monitor-clj.reducer
  (:import (java.util.regex Pattern))
  (:require [build-monitor-clj.properties :refer :all]))

(def priorities ["sick-building" "sick" "healthy-building" "healthy" "unknown"])

(defn aggregate [projects]
  (->> projects
       (group-by (fn [project] (:name project)))
       (map (fn [[k v]] [k (sort-by (fn [i] (.indexOf priorities i)) v)]))
       (map (fn [[_ v]] (first v)))))

(defn- name-matches [regex project]
  (re-matches (Pattern/compile regex) (:name project)))

(defn include-whitelisted-projects [projects]
  (filter #(some (fn [regex] (name-matches regex %)) (included-projects)) projects))

(defn filter-blacklisted-projects [projects]
  (filter #(not-any? (fn [regex] (name-matches regex %)) (excluded-projects)) projects))

(defn show-selected-projects [projects]
  (->> (aggregate projects)
       (include-whitelisted-projects)))