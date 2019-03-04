(ns nevergreen.ci-gateway
  (:require [clojure.string :as s]
            [base64-clj.core :as base64]
            [nevergreen.http :as http]
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

(defn- set-auth-header [username password]
  (if-not (or (s/blank? username) (s/blank? password))
    {"Authorization" (str "Basic " (base64/encode (s/join ":" [username password])))}))

(defn- validate-scheme [url]
  (if (or (s/blank? url)
          (not (re-find #"^https?://" url)))
    (throw (ex-info (invalid-url-error-message url) {}))))

(defn fetch-cctray [{:keys [url username password]}]
  (validate-scheme url)
  (let [decrypted-password (decrypt password (config/aes-key))]
    (http-get url (set-auth-header username decrypted-password))))
