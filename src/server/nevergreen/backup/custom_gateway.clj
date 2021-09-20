(ns nevergreen.backup.custom-gateway
  (:require [nevergreen.gateway :as http]))

(defn ^:dynamic *http-get* [url data]
  (http/http-get url data))

(defn ^:dynamic *http-post* [url data]
  (http/http-post url data))

(def ^:private mime-type "application/json")

(defn create-configuration [{:keys [configuration, url]}]
  (*http-post* url {:body       configuration
                  :content-type :json}))

(defn get-configuration [url]
  (*http-get* url {:accept mime-type
                 :as       :string}))
