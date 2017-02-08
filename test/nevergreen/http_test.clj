(ns nevergreen.http-test
  (:require [nevergreen.http :as subject]
            [midje.sweet :refer :all]
            [clj-http.client :as client])
  (:import (java.net UnknownHostException URISyntaxException)
           (clojure.lang ExceptionInfo)))

(facts "http"
       (fact "adds authentication header"
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

       (fact "throws exception info for unknown hosts"
             (subject/http-get irrelevant {}) => (throws ExceptionInfo "some-host is an unknown host")
             (provided
               (client/get anything anything) =throws=> (UnknownHostException. "some-host: unkown error")))

       (fact "throws exception info for bad uri syntax"
             (subject/http-get irrelevant {}) => (throws ExceptionInfo "Illegal character in authority at index 0: some-url")
             (provided
               (client/get anything anything) =throws=> (URISyntaxException. "some-url" "Illegal character in authority at index 0"))))
