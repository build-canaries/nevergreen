(ns nevergreen.config
  (:require [clojure.string :refer [split trim]]
            [environ.core :as environ]
            [clojure.tools.logging :as log]))

(def ^:private aes-key-length 16)
(def default-aes-key "abcdefghijklmnop")
(def default-ip "0.0.0.0")
(def default-port 5000)
(def default-csp-frame-ancestors "'self'")

(def ^:private use-default-key
  (delay
    (log/warn "No AES_KEY environment variable set, so using the default key. This is NOT recommended, a unique key should be provided!")
    default-aes-key))

(defn ^:dynamic env [key]
  (environ/env key))

(defn- invalid-key [aes-key]
  (throw (IllegalArgumentException. (str "An invalid AES_KEY was provided with length [" (count aes-key) "], a key length of [" aes-key-length "] is required"))))

(defn aes-key []
  (let [aes-key (env :aes-key)]
    (cond
      (nil? aes-key) @use-default-key
      (= aes-key-length (count aes-key)) aes-key
      :else (invalid-key aes-key))))

(defn port []
  (Integer/valueOf (str (or (env :port) default-port))))

(defn ip []
  (or (env :ip) default-ip))

(defn log-level []
  (keyword (env :log-level)))

(defn allow-iframe-from []
  (or (env :allow-iframe-from) default-csp-frame-ancestors))

(defn allow-gitlab-snippets-from []
  (env :allow-gitlab-snippets-from))
