(ns nevergreen.api.security
  (:require [nevergreen.crypto :as crypt]
            [nevergreen.config :as config]))

(defn encrypt-password [{:keys [password]}]
  {:password (crypt/encrypt password (config/aes-key))})
