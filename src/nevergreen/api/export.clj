(ns nevergreen.api.export
  (:require [nevergreen.github-gateway :as github]
            [nevergreen.gitlab-gateway :as gitlab]
            [clojure.string :refer [blank?]]))

(defn ^:dynamic create-gist [data]
  (github/create-gist data))

(defn ^:dynamic update-gist [data]
  (github/update-gist data))

(defn ^:dynamic create-snippet [data]
  (gitlab/create-snippet data))

(defn ^:dynamic update-snippet [data]
  (gitlab/update-snippet data))

(defn- to-github [{:keys [id] :as data}]
  (let [gist (if (blank? id)
               (create-gist data)
               (update-gist data))]
    {:id (:id gist)}))

(defn- to-gitlab [{:keys [id] :as data}]
  (let [gist (if (blank? id)
               (create-snippet data)
               (update-snippet data))]
    {:id (:id gist)}))

(defn export-config [{:keys [where] :as data}]
  (case where
    "github" (to-github data)
    "gitlab" (to-gitlab data)))
