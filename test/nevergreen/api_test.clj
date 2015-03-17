(ns nevergreen.api-test
  (:require [midje.sweet :refer :all]
            [nevergreen.api :as subject]
            [nevergreen.http :as http]
            [clj-cctray.core :as parser]
            [nevergreen.servers :as servers]
            [nevergreen.security :as security]
            [nevergreen.crypto :as crypt]))

(def valid-cctray "http://someserver/cc.xml")
(def username "any-username")
(def password "any-password")

(facts "it finds interesting projects"
       (fact "with authentication"
             (subject/get-interesting-projects {:includedProjects ["project-1"] :cctray valid-cctray :username "a-user" :password "encrypted-password"}) => (list {:name "project-1" :prognosis :sick})
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (crypt/decrypt "encrypted-password") => password
               (security/basic-auth-header "a-user" password) => ..auth-header..
               (http/http-get valid-cctray ..auth-header..) => ..stream..))

       (fact "without authentication"
             (subject/get-interesting-projects {:includedProjects ["project-1"] :cctray valid-cctray}) => (list {:name "project-1" :prognosis :sick})
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (http/http-get valid-cctray nil) => ..stream..)))

(facts "it gets all projects"
       (fact "with authentication"
             (subject/get-all-projects {:url      valid-cctray
                                        :username username
                                        :password "encrypted-password"}) => {:projects (list {:name "project-1" :prognosis :sick})
                                                                             :server   ..server..}
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (crypt/decrypt "encrypted-password") => password
               (security/basic-auth-header username password) => ..auth-header..
               (http/http-get valid-cctray ..auth-header..) => ..stream..
               (servers/detect-server valid-cctray) => ..server..))

       (fact "without authentication"
             (subject/get-all-projects {:url valid-cctray}) => {:projects (list {:name "project-1" :prognosis :sick})
                                                                :server   ..server..}
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (http/http-get valid-cctray nil) => ..stream..
               (servers/detect-server valid-cctray) => ..server..
               (crypt/decrypt anything) => anything :times 0
               (security/basic-auth-header anything anything) => anything :times 0))

       (fact "without authentication if blank username and password"
             (subject/get-all-projects {:url      valid-cctray
                                        :username ""
                                        :password ""}) => {:projects (list {:name "project-1" :prognosis :sick})
                                                           :server   ..server..}
             (provided
               (parser/get-projects ..stream.. anything) => [{:name "project-1" :prognosis :sick}]
               (http/http-get valid-cctray nil) => ..stream..
               (servers/detect-server valid-cctray) => ..server..
               (crypt/decrypt anything) => anything :times 0
               (security/basic-auth-header anything anything) => anything :times 0)))

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
