(ns nevergreen.api
  (:require [clj-cctray.core :as parser]
            [clj-cctray.filtering :as filtering]
            [clojure.string :refer [blank?]]))

(defn detect-server [projects]
  (if (some (fn [project] (re-find #" :: " (:name project))) projects) "go" ""))

(defn get-all-projects [url]
  (let [projects (parser/get-projects url {:normalise :all})
        server (detect-server projects)]
    (if (= server "go")
      {:server server :projects (parser/get-projects url {:normalise :all, :server :go})}
      {:server server :projects projects})))

(defn options-from-config [{:keys [serverType]}]
  (if (not (blank? serverType))
    {:normalise :all, :server (keyword serverType)}
    {:normalise :all}))

(defn get-interesting-projects [params]
  (->> (parser/get-projects (:cctray params) (options-from-config params))
       (filtering/interesting)
       (filtering/by-name (:includedProjects params))))