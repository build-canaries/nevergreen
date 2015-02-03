(ns nevergreen.security
  (:require [clojure.string :refer [join]]
            [base64-clj.core :as base64]
            [nevergreen.config :as config]
            [org.clojars.tnoda.simple-crypto :as crypt]))

(defn encrypt [plain-text]
  (crypt/encrypt plain-text (config/salt)))

(defn basic-auth-header [username password]
  {"Authorization" (str "Basic " (base64/encode (join ":" [username password])))})