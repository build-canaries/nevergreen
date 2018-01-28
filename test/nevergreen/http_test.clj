(ns nevergreen.http-test
  (:require [nevergreen.http :as subject]
            [midje.sweet :refer :all]
            [clj-http.client :as client])
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

       (fact "throws an error for unknown hosts"
             (subject/http-get "some-url" {}) => (throws "some-host is an unknown host")
             (provided
               (client/get anything anything) =throws=> (UnknownHostException. "some-host: unkown error")))

       (fact "throws an error for bad uri syntax"
             (subject/http-get "some-url" {}) => (throws "Illegal character in authority at index 0: some-url")
             (provided
               (client/get anything anything) =throws=> (URISyntaxException. "some-url" "Illegal character in authority at index 0")))

       (fact "throws an error when the CI server responds with an error"
             (subject/http-get "some-url" {}) => (throws "some-error")
             (provided
               (client/get anything anything) =throws=> (ex-info "irrelevant" {:reason-phrase "some-error"})))

       (fact "throws an unknown error when the CI server responds with an error but no reason"
             (subject/http-get "some-url" {}) => (throws "Unknown error")
             (provided
               (client/get anything anything) =throws=> (ex-info "irrelevant" {}))))
