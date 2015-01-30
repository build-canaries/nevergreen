(ns nevergreen.api-test
  (:require [midje.sweet :refer :all]
            [nevergreen.api :as subject]
            [nevergreen.http :as http]
            [clj-cctray.core :as parser]
            [nevergreen.servers :as servers]))

(def valid-cctray "http://someserver/cc.xml")

(fact "it finds interesting projects"
      (subject/get-interesting-projects {:includedProjects ["project-1"] :cctray valid-cctray}) => (list {:name "project-1" :prognosis :sick})
      (provided
        (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
        (http/http-get valid-cctray) => ..stream..))

(fact "it gets all projects"
      (subject/get-all-projects valid-cctray) => {:projects (list {:name "project-1" :prognosis :sick})
                                                  :server   ..server..}
      (provided
        (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
        (http/http-get valid-cctray) => ..stream..
        (servers/detect-server valid-cctray) => ..server..))

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
