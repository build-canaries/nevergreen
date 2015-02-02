(ns nevergreen.security
  (:require [clojure.string :refer [join]]
            [base64-clj.core :as base64]))

  (defn create-hash [plain-text])

  (defn basic-auth-header [username password]
    {"Authorization" (str "Basic " (base64/encode (join ":" [username password])))})