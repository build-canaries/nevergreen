(ns nevergreen.http-test
    (:require [nevergreen.http :as subject]
      [midje.sweet :refer :all]
      [clj-http.client :as client])
    (:import (java.net UnknownHostException URISyntaxException ConnectException)))

(facts "http"
       (fact "adds additional headers"
             (subject/http-get "http://some-url" {"Authentication" "Basic some-password"}) => irrelevant
             (provided
               (client/get anything (contains {:headers (contains {"Authentication" "Basic some-password"})})) => {:body irrelevant}))

       (fact "returns the body"
             (subject/http-get "http://some-url" {}) => ..some-body..
             (provided
               (client/get anything anything) => {:body ..some-body..}))

       (fact "uses the given url"
             (subject/http-get "http://some-url" {}) => irrelevant
             (provided
               (client/get "http://some-url" anything) => {:body irrelevant}))

       (fact "throws an error for unknown hosts"
             (subject/http-get "http://some-url" {}) => (throws "some-host is an unknown host, is the URL correct?")
             (provided
               (client/get anything anything) =throws=> (UnknownHostException. "some-host: unknown error")))

       (fact "throws an error for bad uri syntax"
             (subject/http-get "http://some-url" {}) => (throws "URL is invalid. Illegal character in authority at index 0: some-url")
             (provided
               (client/get anything anything) =throws=> (URISyntaxException. "some-url" "Illegal character in authority at index 0")))

       (fact "throws an error for connect exception"
             (subject/http-get "http://some-url" {}) => (throws "Connection refused, is the URL correct?")
             (provided
               (client/get anything anything) =throws=> (ConnectException. "Connection refused (Connection refused)")))

       (fact "throws an error when the CI server responds with an error but blank reason phrase"
             (subject/http-get "http://some-url" {}) => (throws "CI server returned a 404")
             (provided
               (client/get anything anything) =throws=> (ex-info "irrelevant" {:reason-phrase "" :status 404})))

       (fact "throws an error when the CI server responds with an error"
             (subject/http-get "http://some-url" {}) => (throws "CI server returned a some-error")
             (provided
               (client/get anything anything) =throws=> (ex-info "irrelevant" {:reason-phrase "some-error"})))

       (fact "throws an unknown error when the CI server responds with an error but no reason"
             (subject/http-get "http://some-url" {}) => (throws "CI server returned a Unknown Error")
             (provided
               (client/get anything anything) =throws=> (ex-info "irrelevant" {}))))
