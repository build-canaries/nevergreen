(ns nevergreen.api.security
  (:require [nevergreen.crypto :as crypt]))

(defn encrypt-password [{:keys [password]}]
  {:password (crypt/encrypt password)})
