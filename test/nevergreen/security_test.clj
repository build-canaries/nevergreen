(ns nevergreen.security-test
  (:require [nevergreen.security :as subject]
            [midje.sweet :refer :all]
            [base64-clj.core :as base64]))

(fact "basic auth header base64 encoded"
      (subject/basic-auth-header "any-username" "any-password") => {"Authorization" "Basic hashed-username-password"}

      (provided
        (base64/encode "any-username:any-password") => "hashed-username-password"))
