(ns nevergreen.api.projects-test
  (:require [midje.sweet :refer :all]
            [nevergreen.api.projects :as subject]
            [nevergreen.http :as http]
            [clj-cctray.core :as parser]
            [nevergreen.servers :as servers]
            [nevergreen.security :as security]
            [nevergreen.crypto :as crypt]))

(def valid-url "http://someserver/cc.xml")
(def password "any-password")

(facts "it gets interesting projects"
       (fact "throws exception if the url is not http[s]"
             (subject/get-interesting [{:url "not-http"}]) => (throws Exception))

       (fact "removes healthy projects"
             (subject/get-interesting [{:trayId "a-tray" :included ["project-1"] :url valid-url}]) => (list)
             (provided
               (subject/get-all anything) => [{:name "project-1" :prognosis :healthy}]))

       (facts "uses pmap to parallelise the work"
              (fact "if multiple projects are given"
                    (subject/get-interesting [{:url "http://a"} {:url "http://b"}]) => irrelevant
                    (provided
                      (pmap anything anything) => irrelevant))

              (fact "unless only one project is given"
                    (subject/get-interesting [{:url "http://a"}]) => irrelevant
                    (provided
                      (pmap anything anything) => irrelevant :times 0
                      (subject/fetch-interesting anything) => irrelevant)))

       (fact "handles no tray id being given"
             (subject/get-interesting [{:included ["project"] :url valid-url}]) => (list {:tray-id nil :name "project" :prognosis :sick})
             (provided
               (subject/get-all anything) => [{:name "project" :prognosis :sick}])))

(facts "it gets all projects"
       (fact "throws exception if the url is not http[s]"
             (subject/get-all [{:url "not-http"}]) => (throws Exception))

       (fact "with authentication"
             (subject/get-all {:url valid-url :username "a-user" :password "encrypted-password"}) => (contains (list (contains {:name       "project-1"
                                                                                                                                :prognosis  :sick
                                                                                                                                :project-id anything})))
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (crypt/decrypt "encrypted-password") => password
               (security/basic-auth-header "a-user" password) => ..auth-header..
               (http/http-get valid-url ..auth-header..) => ..stream..))

       (fact "without authentication"
             (subject/get-all {:url valid-url}) => (contains (list (contains {:name       "project-1"
                                                                              :prognosis  :sick
                                                                              :project-id anything})))
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (http/http-get valid-url nil) => ..stream..
               (crypt/decrypt anything) => anything :times 0
               (security/basic-auth-header anything anything) => anything :times 0))

       (fact "without authentication if blank username and password"
             (subject/get-all {:url valid-url :username "" :password ""}) => (contains (list (contains {:name       "project-1"
                                                                                                        :prognosis  :sick
                                                                                                        :project-id anything})))
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (http/http-get valid-url nil) => ..stream..
               (crypt/decrypt anything) => anything :times 0
               (security/basic-auth-header anything anything) => anything :times 0)))

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
