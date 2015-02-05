(ns nevergreen.config
  (:require [clojure.string :refer [split trim]]
            [environ.core :refer [env]]))

(def default-aes-key "abcdefghijklmnop")
(def aes-key-length 16)

(defn port []
  (Integer. (or (env :port) 5000)))

(defn aes-key []
  (let [aes-key (env :aes_key)]
    (if (= aes-key-length (count aes-key)) aes-key default-aes-key)))
