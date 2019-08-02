(ns nevergreen.ci-gateway
  (:require [clojure.string :as s]
            [base64-clj.core :as base64]
            [nevergreen.gateway :as http]
            [nevergreen.crypto :as crypt]
            [nevergreen.config :as config]))

(defn ^:dynamic http-get [url additional-headers]
  (http/http-get url additional-headers))

(defn ^:dynamic decrypt [password aes-key]
  (crypt/decrypt password aes-key))

(defn- invalid-url-error-message [url]
  (if (s/blank? url)
    "URL is blank, a http(s) URL must be provided"
    (str "URL is invalid, only http(s) URLs are supported")))

(defn- auth-using-credentials [username password]
  (if-not (or (s/blank? username) (s/blank? password))
    (let [decrypted-password (decrypt password (config/aes-key))]
      (str "Basic " (base64/encode (s/join ":" [username decrypted-password]))))))

(defn- auth-using-token [access-token]
  (str "Bearer " (decrypt access-token (config/aes-key))))

(defn- get-headers [auth-type username password access-token]
  (cond
    (= "basic" auth-type) {"Authorization" (auth-using-credentials username password)}
    (= "token" auth-type) {"Authorization" (auth-using-token access-token)}
    :else nil))

(defn- validate-scheme [url]
  (if (or (s/blank? url)
          (not (re-find #"^https?://" url)))
    (throw (ex-info (invalid-url-error-message url) {:status 400}))))

(defn fetch-cctray [{:keys [url auth-type username password access-token]}]
  (validate-scheme url)
  (http-get url {:headers (get-headers auth-type username password access-token)
                 :accept  "application/xml"
                 :as      :stream}))
