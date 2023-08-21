(ns nevergreen.projects.ci-gateway
  (:require [base64-clj.core :as base64]
            [cemerick.url :as u]
            [clojure.string :as s]
            [nevergreen.config :as config]
            [nevergreen.crypto :as crypt]
            [nevergreen.gateway :as http]))

(defn ^:dynamic *http-get* [url additional-headers]
  (http/http-get url additional-headers))

(defn ^:dynamic *http-head* [url additional-headers]
  (http/http-head url additional-headers))

(defn ^:dynamic *decrypt* [password aes-key]
  (crypt/decrypt password aes-key))

(defn- not-blank? [str]
  (not (s/blank? str)))

(defn- invalid-url-error-message [url]
  (if (s/blank? url)
    "URL is blank, a http(s) URL must be provided"
    (str "URL is invalid, only http(s) URLs are supported")))

(defn- auth-using-credentials [{:keys [username password encrypted-auth]}]
  (if (or (not-blank? username) (not-blank? password) (not-blank? encrypted-auth))
    (let [decrypted-password (or (*decrypt* encrypted-auth (config/aes-key)) password)]
      (str "Basic " (base64/encode (s/join ":" [username decrypted-password]))))))

(defn- auth-using-token [{:keys [access-token encrypted-auth]}]
  (str "Bearer " (or (*decrypt* encrypted-auth (config/aes-key)) access-token)))

(defn- get-headers [{:keys [auth-type] :as feed}]
  (cond
    (= "basic" auth-type) {"Authorization" (auth-using-credentials feed)}
    (= "token" auth-type) {"Authorization" (auth-using-token feed)}
    :else nil))

(defn- auth-using-query-param [{:keys [url auth-type username password encrypted-auth]}]
  (if (= "queryParam" auth-type)
    (-> (u/url url)
        (assoc-in [:query username] (or (*decrypt* encrypted-auth (config/aes-key)) password))
        str)
    url))

(defn- validate-scheme [url]
  (if (or (s/blank? url)
          (not (re-find #"^https?://" url)))
    (throw (ex-info (invalid-url-error-message url) {:status 400}))))

(defn- fetch [{:keys [url] :as feed} verb]
  (validate-scheme url)
  (verb (auth-using-query-param feed) {:headers (get-headers feed)
             :accept  "application/xml"
             :as      :stream}))

(defn fetch-cctray [feed]
  (fetch feed, *http-get*))

(defn test-connection [feed]
  (fetch feed *http-head*))
