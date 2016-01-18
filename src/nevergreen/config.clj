(ns nevergreen.config
  (:require [clojure.string :refer [split trim]]
            [environ.core :refer [env]]
            [clojure.tools.logging :as log]))

(def ^:private aes-key-length 16)
(def default-aes-key "abcdefghijklmnop")

(def ^:private use-default-key
  (delay
    (log/warn "No AES_KEY environment variable set, so using the default key. This is NOT recommended, a unique key should be provided!")
    default-aes-key))

(defn- invalid-key [aes-key]
  (throw (IllegalArgumentException. (str "An invalid AES_KEY was provided with length [" (count aes-key) "], a key length of [" aes-key-length "] is required"))))

(defn port []
  (Integer. (or (env :port) 5000)))

(defn aes-key []
  (let [aes-key (env :aes-key)]
    (cond
      (nil? aes-key) @use-default-key
      (= aes-key-length (count aes-key)) aes-key
      :else (invalid-key aes-key))))

(defn admin-username []
  (or (env :admin-username) "nevergreen"))

(defn admin-password []
  (or (env :admin-password) "changeme"))
