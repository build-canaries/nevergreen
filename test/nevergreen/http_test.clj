(ns nevergreen.http-test
  (:require [nevergreen.http :as subject]
            [midje.sweet :refer :all]
            [clj-http.client :as client]
            [nevergreen.errors :refer [create-error]])
  (:import (java.net UnknownHostException URISyntaxException)))

(facts "http"
       (fact "adds additional headers"
             (subject/http-get irrelevant {"Authentication" "Basic some-password"}) => irrelevant
             (provided
               (client/get anything (contains {:headers (contains {"Authentication" "Basic some-password"})})) => {:body irrelevant}))

       (fact "returns the body"
             (subject/http-get irrelevant {}) => ..some-body..
             (provided
               (client/get anything anything) => {:body ..some-body..}))

       (fact "uses the given url"
             (subject/http-get ..url.. {}) => irrelevant
             (provided
               (client/get ..url.. anything) => {:body irrelevant}))

       (fact "creates an error for unknown hosts"
             (subject/http-get "some-url" {}) => irrelevant
             (provided
               (client/get anything anything) =throws=> (UnknownHostException. "some-host: unkown error")
               (create-error "some-host is an unknown host" "some-url") => {}))

       (fact "creates an error for bad uri syntax"
             (subject/http-get "some-url" {}) => irrelevant
             (provided
               (client/get anything anything) =throws=> (URISyntaxException. "some-url" "Illegal character in authority at index 0")
               (create-error "Illegal character in authority at index 0: some-url" "some-url") => {}))

       (fact "creates an error when the CI server responds with an error"
             (subject/http-get "some-url" {}) => irrelevant
             (provided
               (client/get anything anything) =throws=> (ex-info "irrelevant" {:reason-phrase "some-error"})
               (create-error "some-error" "some-url") => {}))

       (fact "creates an unknown error when the CI server responds with an error but no reason"
             (subject/http-get "some-url" {}) => irrelevant
             (provided
               (client/get anything anything) =throws=> (ex-info "irrelevant" {})
               (create-error "Unknown Error" "some-url") => {})))
