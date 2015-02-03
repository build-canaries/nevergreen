(ns nevergreen.security-test
  (:require [nevergreen.security :as subject]
            [midje.sweet :refer :all]
            [nevergreen.config :as config]
            [base64-clj.core :as base64]
            [org.clojars.tnoda.simple-crypto :as crypt]))

(fact "basic auth header base64 encoded"
      (subject/basic-auth-header "any-username" "any-password") => {"Authorization" "Basic hashed-username-password"}

      (provided
        (base64/encode "any-username:any-password") => "hashed-username-password"))

(fact "creates encrypted string"
      (subject/encrypt "some-text") => "hashed-string"

      (provided
        (config/salt) => ..salt..
        (crypt/encrypt "some-text" ..salt..) => "hashed-string"))
