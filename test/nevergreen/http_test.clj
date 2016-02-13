(ns nevergreen.http-test
  (:require [nevergreen.http :as subject]
            [midje.sweet :refer :all]
            [clj-http.client :as client])
  (:import (java.net UnknownHostException URISyntaxException)
           (clojure.lang ExceptionInfo)))

(facts "sets headers"
       (fact "without authentication"
             (subject/http-get ..url.. {}) => ..some-body..
             (provided
               (client/get ..url.. {:insecure?             true
                                    :timeout               30000
                                    :headers               {"Accept" "application/xml"}
                                    :as                    :stream
                                    :throw-entire-message? true}) => {:body ..some-body..}))
       (fact "with authentication"
             (subject/http-get ..url.. {"Authentication" "Basic some-password"}) => ..some-body..
             (provided
               (client/get ..url.. {:insecure?             true
                                    :timeout               30000
                                    :headers               {"Accept" "application/xml" "Authentication" "Basic some-password"}
                                    :as                    :stream
                                    :throw-entire-message? true}) => {:body ..some-body..}))

       (fact "throws exception info for unknown hosts"
             (subject/http-get ..url.. {}) => (throws ExceptionInfo "some-host is an unknown host")
             (provided
               (client/get ..url.. anything) =throws=> (UnknownHostException. "some-host: unkown error")))

       (fact "throws exception info for bad uri syntax"
             (subject/http-get ..url.. {}) => (throws ExceptionInfo "Illegal character in authority at index 0: some-url")
             (provided
               (client/get ..url.. anything) =throws=> (URISyntaxException. "some-url" "Illegal character in authority at index 0"))))
