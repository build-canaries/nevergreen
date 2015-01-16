(ns nevergreen.api-test
  (:require [midje.sweet :refer :all]
            [nevergreen.api :as subject]
            [nevergreen.http :as http]
            [clj-cctray.core :as parser]))

(def valid-cctray "http://someserver/cc.xml")

(fact "it finds interesting projects"
      (subject/get-interesting-projects {:includedProjects ["project-1"] :cctray valid-cctray}) => (list {:name "project-1" :prognosis :sick})
      (provided
        (parser/get-projects anything anything) => [{:name "project-1" :prognosis :sick}]))

(facts "we can detect if we are using a go server"
       (fact "it is not a go server"
             (subject/get-all-projects valid-cctray) => (contains {:server ""})
             (provided
               (parser/get-projects ..stream.. {:normalise true}) => [{:name "project-1"}]
               (http/http-get valid-cctray) => ..stream..))

       (fact "it is a go server"
             (subject/get-all-projects valid-cctray) => (contains {:server "go"})
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1"} {:name "project-1 :: job1"}]
               (http/http-get valid-cctray) => ..stream..)))

(facts "parses requested serverType"
       (fact "converts go server param to symbol"
             (subject/options-from-config {:serverType "go"}) => {:normalise true, :server :go})
       (fact "gives nil for empty string"
             (subject/options-from-config {:serverType ""}) => {:normalise true}))

(facts "check url is invalid"
       (fact (subject/invalid-url? "http://bleh") => false)
       (fact (subject/invalid-url? "https://bleh") => false)
       (fact (subject/invalid-url? "gopher://bleh") => true)
       (fact (subject/invalid-url? nil) => true))
