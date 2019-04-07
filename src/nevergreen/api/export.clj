(ns nevergreen.api.export
  (:require [nevergreen.github-gateway :as github]
            [clojure.string :refer [blank?]]))

(defn ^:dynamic create-gist [data]
  (github/create-gist data))

(defn ^:dynamic update-gist [data]
  (github/update-gist data))

(defn- to-github [{:keys [id] :as data}]
  (let [gist (if (blank? id)
               (create-gist data)
               (update-gist data))]
    {:id (:id gist)}))

(defn export-config [{:keys [where] :as data}]
  (case where
    "github" (to-github data)))
