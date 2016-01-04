(ns nevergreen.http-test
  (:require [nevergreen.http :as subject]
            [midje.sweet :refer :all]
            [clj-http.client :as client]))

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
                                    :throw-entire-message? true}) => {:body ..some-body..})))