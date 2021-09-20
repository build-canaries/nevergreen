(ns nevergreen.backup.import
  (:require [nevergreen.backup.github-gateway :as github]
            [nevergreen.backup.gitlab-gateway :as gitlab]
            [nevergreen.backup.custom-gateway :as custom]
            [nevergreen.crypto :as crypt]
            [nevergreen.config :as config]))

(def ^:private ten-megs 10485760)

(defn ^:dynamic *get-custom* [url]
  (custom/get-configuration url))

(defn ^:dynamic *get-gist* [id url]
  (github/get-gist id url))

(defn ^:dynamic *get-truncated-file* [url]
  (github/get-truncated-file url))

(defn ^:dynamic *get-snippet-meta* [data]
  (gitlab/get-snippet-meta data))

(defn ^:dynamic *get-snippet-content* [data]
  (gitlab/get-snippet-content data))

(defn ^:dynamic *decrypt* [password aes-key]
  (crypt/decrypt password aes-key))

(defn- from-github [{:keys [id, url]}]
  (let [{:keys [files, description]} (*get-gist* id url)
        configuration-json (:configuration.json files)]
    (if (nil? configuration-json)
      (throw (ex-info "gist does not contain the required configuration.json file" {:id id :status 422}))
      (let [{:keys [truncated, size, raw_url, content]} configuration-json
            configuration (cond
                            (and (true? truncated) (> size ten-megs)) (throw (ex-info (str "gist configuration.json file is too big to fetch without git cloning, size " size " bytes") {:id id :status 422}))
                            (true? truncated) (*get-truncated-file* raw_url)
                            :else content)]
        {:id            id
         :description   description
         :where         "github"
         :configuration configuration}))))

(defn- from-gitlab [{:keys [id] :as data}]
  (let [{:keys [file_name title]} (*get-snippet-meta* data)]
    (if (not (= "configuration.json" file_name))
      (throw (ex-info "snippet does not contain the required configuration.json file" {:id id :status 422}))
      (let [snippet (*get-snippet-content* data)]
        {:id            id
         :description   title
         :where         "gitlab"
         :configuration snippet}))))

(defn- from-custom [{:keys [url]}]
  {:where         "custom"
   :configuration (*get-custom* url)})

(defn import-config [{:keys [from] :as data}]
  (let [decrypted-data (update-in data [:token] (fn [token]
                                                  (if (nil? token)
                                                    (*decrypt* (:encrypted-token data) (config/aes-key))
                                                    token)))]
    (case from
      "github" (from-github decrypted-data)
      "gitlab" (from-gitlab decrypted-data)
      "custom" (from-custom decrypted-data)
      (throw (ex-info (str "importing from \"" from "\" is not supported") {:status 400})))))
