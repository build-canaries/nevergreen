(ns nevergreen.api.security
  (:require [nevergreen.crypto :as crypt]
            [nevergreen.config :as config]))

(defn encrypt-data [data]
  (crypt/encrypt data (config/aes-key)))
