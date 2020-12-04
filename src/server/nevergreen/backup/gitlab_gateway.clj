(ns nevergreen.backup.gitlab-gateway
  (:require [nevergreen.gateway :as http]
            [cheshire.core :as cheshire]
            [clojure.string :as s]))

(defn ^:dynamic http-get [url data]
  (http/http-get url data))

(defn ^:dynamic http-post [url data]
  (http/http-post url data))

(defn ^:dynamic http-put [url data]
  (http/http-put url data))

(def ^:private mime-type "application/json")

(defn- host [url]
  (if (s/blank? url)
    "https://gitlab.com"
    (s/replace url #"/$" "")))

(defn- snippet-url
  ([url] (snippet-url url nil nil))
  ([url id] (snippet-url url id nil))
  ([url id extra]
   (str (host url) "/api/v4/snippets/" id extra)))

(defn- snippet [description configuration]
  (cheshire/generate-string {:title      description,
                             :visibility "public",
                             :file_name  "configuration.json",
                             :content    configuration}))

(defn create-snippet [{:keys [description, configuration, token, url]}]
  (http-post (snippet-url url) {:body         (snippet description configuration)
                                :query-params {"private_token" token}
                                :content-type :json
                                :accept       mime-type
                                :as           :json}))

(defn update-snippet [{:keys [description, configuration, token, id url]}]
  (http-put (snippet-url url id) {:body         (snippet description configuration)
                                  :query-params {"private_token" token}
                                  :content-type :json
                                  :accept       mime-type
                                  :as           :json}))

(defn get-snippet-meta [{:keys [token, id url]}]
  (http-get (snippet-url url id) {:accept       mime-type
                                  :query-params {"private_token" token}
                                  :as           :json}))

(defn get-snippet-content [{:keys [token, id url]}]
  (http-get (snippet-url url id "/raw") {:accept       mime-type
                                         :query-params {"private_token" token}}))
