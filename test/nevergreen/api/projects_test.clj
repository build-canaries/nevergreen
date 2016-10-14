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

(facts "it fetches projects"
       (fact "with authentication"
             (subject/fetch-tray {:url valid-url :username "a-user" :password "encrypted-password"}) => (contains (list (contains {:name       "project-1"
                                                                                                                                   :prognosis  :sick})))
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (crypt/decrypt "encrypted-password") => password
               (security/basic-auth-header "a-user" password) => ..auth-header..
               (http/http-get valid-url ..auth-header..) => ..stream..))

       (fact "without authentication"
             (subject/fetch-tray {:url valid-url}) => (contains (list (contains {:name       "project-1"
                                                                                 :prognosis  :sick})))
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (http/http-get valid-url nil) => ..stream..
               (crypt/decrypt anything) => anything :times 0
               (security/basic-auth-header anything anything) => anything :times 0))

       (fact "without authentication if blank username and password"
             (subject/fetch-tray {:url valid-url :username "" :password ""}) => (contains (list (contains {:name       "project-1"
                                                                                                           :prognosis  :sick})))
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (http/http-get valid-url nil) => ..stream..
               (crypt/decrypt anything) => anything :times 0
               (security/basic-auth-header anything anything) => anything :times 0)))

(facts "it gets all projects"
       (fact "throws exception if the url is not valid"
             (subject/get-all [{:url "url"}]) => (throws Exception)
             (provided
               (subject/invalid-scheme? "url") => true))

       (facts "uses pmap to parallelise the work"
              (fact "if multiple projects are given"
                    (subject/get-all [{:url "http://a"} {:url "http://b"}]) => irrelevant
                    (provided
                      (pmap anything anything) => irrelevant))

              (fact "unless only one project is given"
                    (subject/get-all [{:url "http://a"}]) => irrelevant
                    (provided
                      (pmap anything anything) => irrelevant :times 0
                      (subject/fetch-tray anything) => irrelevant))))

(facts "it gets interesting projects"
       (fact "throws exception if the url is not http[s]"
             (subject/get-interesting [{:url "url"}]) => (throws Exception)
             (provided
               (subject/invalid-scheme? "url") => true))

       (fact "removes healthy projects"
             (subject/get-interesting [{:tray-id "a-tray" :included ["project-1"] :url valid-url}]) => (list)
             (provided
               (subject/fetch-tray anything) => {:web-url "project-1" :prognosis :healthy}))

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
             (subject/get-interesting [{:included ["project"] :url valid-url}]) => (list {:tray-id nil :prognosis :sick :web-url "project"})
             (provided
               (subject/fetch-tray anything) => [{:web-url "project" :prognosis :sick}])))

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
       (fact (subject/invalid-scheme? "http://bleh") => false)
       (fact (subject/invalid-scheme? "https://bleh") => false)
       (fact (subject/invalid-scheme? "gopher://bleh") => true)
       (fact (subject/invalid-scheme? nil) => true))
