(ns nevergreen.api-test
  (:require [midje.sweet :refer :all]
            [nevergreen.api :as subject]
            [nevergreen.servers :as servers]
            [nevergreen.crypto :as crypt]))

(facts "parses requested serverType"
       (fact "converts go server param to symbol"
             (subject/options-from-config {:serverType "go"}) => (contains {:server :go}))

       (fact "auto detects if blank"
             (subject/options-from-config {:serverType "" :cctray "some-url"}) => (contains {:server ..server..})
             (provided
               (servers/detect-server "some-url") => ..server..)))

(facts "check url is invalid"
       (fact (subject/invalid-url? "http://bleh") => false)
       (fact (subject/invalid-url? "https://bleh") => false)
       (fact (subject/invalid-url? "gopher://bleh") => true)
       (fact (subject/invalid-url? nil) => true))

(fact "encrypts password"
      (subject/encrypt-password "some-password") => {:password "encrypted-password"}
      (provided
        (crypt/encrypt "some-password") => "encrypted-password"))
