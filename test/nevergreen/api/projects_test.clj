(ns nevergreen.api.projects-test
  (:require [midje.sweet :refer :all]
            [nevergreen.api.projects :as subject]
            [nevergreen.http :as http]
            [clj-cctray.core :as parser]
            [nevergreen.servers :as servers]
            [nevergreen.security :as security]
            [nevergreen.crypto :as crypt]))

(def valid-url "http://someserver/cc.xml")
(def username "any-username")
(def password "any-password")

(facts "it gets interesting projects"
       (fact "throws exception if the url is not valid"
             (subject/get-interesting [{:url "not-http"}]) => (throws Exception))

       (fact "with authentication"
             (subject/get-interesting [{:included ["project-1"] :url valid-url :username "a-user" :password "encrypted-password"}]) => (list {:name "project-1" :prognosis :sick})
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (crypt/decrypt "encrypted-password") => password
               (security/basic-auth-header "a-user" password) => ..auth-header..
               (http/http-get valid-url ..auth-header..) => ..stream..))

       (fact "without authentication"
             (subject/get-interesting [{:included ["project-1"] :url valid-url}]) => (list {:name "project-1" :prognosis :sick})
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (http/http-get valid-url nil) => ..stream..))

       (facts "uses pmap to parallelise the work"
              (fact "if multiple projects are given"
                    (subject/get-interesting [{:url "http://a"} {:url "http://b"}]) => irrelevant
                    (provided
                      (pmap anything anything) => irrelevant))

              (fact "unless only one project is given"
                    (subject/get-interesting [{:url "http://a"}]) => irrelevant
                    (provided
                      (pmap anything anything) => irrelevant :times 0
                      (subject/fetch-interesting anything) => irrelevant))))

(facts "gets the server type"
       (fact "converts known server value to a symbol"
             (subject/get-server-type {:serverType "go"}) => :go)

       (fact "auto detects if blank"
             (subject/get-server-type {:serverType "" :url "some-url"}) => ..server..
             (provided
               (servers/detect-server "some-url") => ..server..))

       (fact "auto detects if unknown value"
             (subject/get-server-type {:serverType "foo-bar" :url "some-url"}) => ..server..
             (provided
               (servers/detect-server "some-url") => ..server..)))

(facts "check url is invalid"
       (fact (subject/invalid-url? "http://bleh") => false)
       (fact (subject/invalid-url? "https://bleh") => false)
       (fact (subject/invalid-url? "gopher://bleh") => true)
       (fact (subject/invalid-url? nil) => true))
