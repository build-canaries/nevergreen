(ns nevergreen.api.security
  (:require [nevergreen.crypto :as crypt]
            [nevergreen.config :as config]))

(defn encrypt-data [data]
  (let [keys (keys data)]
    (reduce
      (fn [acc key]
        (assoc acc key (crypt/encrypt (get data key) (config/aes-key))))
      {} keys)))
