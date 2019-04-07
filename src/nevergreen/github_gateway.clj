(ns nevergreen.github-gateway
  (:require [nevergreen.gateway :as http]
            [cheshire.core :as cheshire]
            [clojure.string :as s]))

(defn ^:dynamic http-get [url data]
  (http/http-get url data))

(defn ^:dynamic http-post [url data]
  (http/http-post url data))

(defn ^:dynamic http-patch [url data]
  (http/http-patch url data))

(def ^:private mime-type "application/vnd.github.v3+json")

(defn- host [url]
  (if (s/blank? url)
    "https://api.github.com"
    (s/replace url #"/$" "")))

(defn- gist-url
  ([url] (gist-url url nil))
  ([url id]
   (str (host url) "/gists/" id)))

(defn- auth-header [token]
  {"Authorization" (str "token " token)})

(defn- gist [description configuration]
  (cheshire/generate-string {:description description
                             :public      false
                             :files       {"configuration.json" {:content configuration}}}))

(defn create-gist [{:keys [description, configuration, token, url]}]
  (http-post (gist-url url) {:body         (gist description configuration)
                             :content-type :json
                             :accept       mime-type
                             :headers      (auth-header token)
                             :as           :json}))

(defn update-gist [{:keys [description, configuration, token, id url]}]
  (http-patch (gist-url url id) {:body         (gist description configuration)
                                 :content-type :json
                                 :accept       mime-type
                                 :headers      (auth-header token)
                                 :as           :json}))

(defn get-gist [id url]
  (http-get (gist-url url id) {:accept mime-type
                               :as     :json}))

(defn get-truncated-file [url]
  (http-get url {:accept "text/plain; charset=utf-8"}))
