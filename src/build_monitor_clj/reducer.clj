(ns build-monitor-clj.reducer
  (:require [build-monitor-clj.properties :refer :all]))

(def priorities ["sick-building" "sick" "healthy-building" "healthy" "unknown"])

(defn aggregate [projects]
  (->> projects
       (group-by (fn [project] (:name project)))
       (map (fn [[k v]] [k (sort-by (fn [i] (.indexOf priorities i)) v)]))
       (map (fn [[_ v]] (first v)))))

(defn filter-for-white-listed-projects [projects]
  (filter #(some #{(:name %)} (included-projects)) projects))

(defn show-selected-projects [projects]
  (->> (aggregate projects)
       (filter-for-white-listed-projects)))