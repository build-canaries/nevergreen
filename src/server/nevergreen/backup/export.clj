(ns nevergreen.backup.export
  (:require [nevergreen.backup.github-gateway :as github]
            [nevergreen.backup.gitlab-gateway :as gitlab]
            [nevergreen.backup.custom-gateway :as custom]
            [nevergreen.crypto :as crypt]
            [nevergreen.config :as config]
            [clojure.string :refer [blank?]]))

(defn ^:dynamic *create-custom* [data]
  (custom/create-configuration data))

(defn ^:dynamic *create-gist* [data]
  (github/create-gist data))

(defn ^:dynamic *update-gist* [data]
  (github/update-gist data))

(defn ^:dynamic *create-snippet* [data]
  (gitlab/create-snippet data))

(defn ^:dynamic *update-snippet* [data]
  (gitlab/update-snippet data))

(defn ^:dynamic *decrypt* [password aes-key]
  (crypt/decrypt password aes-key))

(defn- to-hosted [{:keys [id] :as data} do-create do-update]
  (let [res (if (blank? id)
              (do-create data)
              (do-update data))]
    {:id (str (:id res))}))

(defn- to-github [data]
  (to-hosted data *create-gist* *update-gist*))

(defn- to-gitlab [data]
  (to-hosted data *create-snippet* *update-snippet*))

(defn export-config [{:keys [where] :as data}]
  (let [decrypted-data (update-in data [:token] (fn [token]
                                                  (if (nil? token)
                                                    (*decrypt* (:encrypted-token data) (config/aes-key))
                                                    token)))]
    (case where
      "github" (to-github decrypted-data)
      "gitlab" (to-gitlab decrypted-data)
      "custom" (*create-custom* decrypted-data)
      (throw (ex-info (str "exporting to \"" where "\" is not supported") {:status 400})))))
