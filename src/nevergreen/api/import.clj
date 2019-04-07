(ns nevergreen.api.import
  (:require [nevergreen.github-gateway :as github]))

(def ^:private ten-megs 10485760)

(defn ^:dynamic get-gist [id]
  (github/get-gist id))

(defn ^:dynamic get-truncated-file [url]
  (github/get-truncated-file url))

(defn- from-github [id]
  (let [{:keys [files, description]} (get-gist id)
        configuration-json (:configuration.json files)]
    (if (nil? configuration-json)
      (throw (ex-info "gist does not contain the required configuration.json file" {:id id}))
      (let [{:keys [truncated, size, raw_url, content]} configuration-json
            configuration (cond
                            (and (true? truncated) (> size ten-megs)) (throw (ex-info (str "gist configuration.json file is too big to fetch without git cloning, size " size " bytes") {:id id}))
                            (true? truncated) (get-truncated-file raw_url)
                            :else content)]
        {:id            id
         :description   description
         :where         "github"
         :configuration configuration}))))

(defn import-config [{:keys [from, id]}]
  (case from
    "github" (from-github id)))
