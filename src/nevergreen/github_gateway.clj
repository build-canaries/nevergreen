(ns nevergreen.github-gateway
  (:require [nevergreen.http :as http]
            [cheshire.core :as cheshire]))

(defn ^:dynamic http-get [url data]
  (http/http-get url data))

(defn ^:dynamic http-post [url data]
  (http/http-post url data))

(defn ^:dynamic http-patch [url data]
  (http/http-patch url data))

(def ^:private mime-type "application/vnd.github.v3+json")

(defn- auth-header [token]
  {"Authorization" (str "token " token)})

(defn- gist [description configuration]
  (cheshire/generate-string {:description description
                             :public      false
                             :files       {"configuration.json" {:content configuration}}}))

(defn create-gist [{:keys [description, configuration, token]}]
  (http-post "https://api.github.com/gists" {:body         (gist description configuration)
                                             :content-type :json
                                             :accept       mime-type
                                             :headers      (auth-header token)
                                             :as           :json}))

(defn update-gist [{:keys [description, configuration, token, id]}]
  (http-patch (str "https://api.github.com/gists/" id) {:body         (gist description configuration)
                                                        :content-type :json
                                                        :accept       mime-type
                                                        :headers      (auth-header token)
                                                        :as           :json}))

(defn get-gist [id]
  (http-get (str "https://api.github.com/gists/" id) {:accept mime-type
                                                      :as     :json}))

(defn get-truncated-file [url]
  (http-get url {:accept "text/plain; charset=utf-8"}))
