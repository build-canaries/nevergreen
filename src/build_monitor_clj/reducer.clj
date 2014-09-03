(ns build-monitor-clj.reducer)

(def priorities ["sick-building" "sick" "healthy-building" "healthy" "unknown"])

(defn aggregate [projects]
  (->> projects
       (group-by (fn [project] (:name project)))
       (map (fn [[k v]] [k (sort-by (fn [i] (.indexOf priorities i)) v)]))
       (map (fn [[_ v]] (first v)))))
