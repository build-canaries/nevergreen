(ns nevergreen.api.projects-test
  (:require [midje.sweet :refer :all]
            [nevergreen.api.projects :as subject]
            [nevergreen.http :as http]
            [clj-cctray.core :as parser]
            [nevergreen.servers :as servers]
            [nevergreen.security :as security]
            [nevergreen.crypto :as crypt]
            [nevergreen.errors :refer [create-error]]))

(def valid-url "http://someserver/cc.xml")
(def password "any-password")

(facts "it fetches projects"
       (fact "with authentication"
             (subject/fetch-tray {:url      valid-url
                                  :username "a-user"
                                  :password "encrypted-password"}) =>
             (contains (list (contains {:name        "project-1"
                                        :prognosis   :sick
                                        :project-id  anything
                                        :server-type anything})))
             (provided
               (parser/get-projects ..stream.. anything) => [{:name      "project-1"
                                                              :web-url   "project-1"
                                                              :prognosis :sick}]
               (crypt/decrypt "encrypted-password") => password
               (security/basic-auth-header "a-user" password) => ..auth-header..
               (http/http-get valid-url ..auth-header..) => ..stream..))

       (fact "without authentication"
             (subject/fetch-tray {:url valid-url}) =>
             (contains (list (contains {:name        "project-1"
                                        :prognosis   :sick
                                        :project-id  anything
                                        :server-type anything})))
             (provided
               (parser/get-projects ..stream.. anything) => [{:name      "project-1"
                                                              :web-url   "project-1"
                                                              :prognosis :sick}]
               (http/http-get valid-url nil) => ..stream..
               (crypt/decrypt anything) => nil
               (security/basic-auth-header anything anything) => anything :times 0))

       (fact "without authentication if blank username and password"
             (subject/fetch-tray {:url      valid-url
                                  :username ""
                                  :password ""}) =>
             (contains (list (contains {:name        "project-1"
                                        :prognosis   :sick
                                        :project-id  anything
                                        :server-type anything})))
             (provided
               (parser/get-projects ..stream.. anything) => [{:name      "project-1"
                                                              :web-url   "project-1"
                                                              :prognosis :sick}]
               (http/http-get valid-url nil) => ..stream..
               (crypt/decrypt anything) => nil
               (security/basic-auth-header anything anything) => anything :times 0))

       (fact "creates an error if the URL is not valid"
             (subject/fetch-tray {:url "url"}) => [{:error-message "ExceptionInfo: Only http(s) URLs are supported: url"
                                                    :is-error      true
                                                    :url           "url"}])

       (fact "handles failing to decrypt the password"
             (subject/fetch-tray {:url      valid-url
                                  :username ""
                                  :password "some-encrypted-password"}) => [{:error-message "ExceptionInfo: some-error"
                                                                             :is-error      true
                                                                             :url           valid-url}]
             (provided
               (crypt/decrypt "some-encrypted-password") =throws=> (ex-info "some-error" {}))))

(facts "it gets all projects"
       (facts "uses pmap to parallelise the work"
              (fact "if multiple projects are given"
                    (subject/get-all [{:url "http://a"}
                                      {:url "http://b"}]) => irrelevant
                    (provided
                      (pmap anything anything) => irrelevant))

              (fact "unless only one project is given"
                    (subject/get-all [{:url "http://a"}]) => irrelevant
                    (provided
                      (pmap anything anything) => irrelevant :times 0
                      (subject/fetch-tray anything) => {}))))

(facts "it gets interesting projects"
       (fact "removes healthy projects"
             (subject/get-interesting [{:tray-id  "a-tray"
                                        :included ["project-1"]
                                        :url      valid-url}]) => (list)
             (provided
               (subject/fetch-tray anything) => {:project-id "project-1"
                                                 :prognosis  :healthy}))

       (fact "without filtering out tray errors"
             (subject/get-interesting [{:tray-id  "a-tray"
                                        :included ["project-1"]
                                        :url      valid-url}]) => [{:error-message "some-error"
                                                                    :is-error      true
                                                                    :tray-id       "a-tray"
                                                                    :url           valid-url}]
             (provided
               (subject/fetch-tray anything) => [(create-error "some-error" valid-url)]))

       (facts "uses pmap to parallelise the work"
              (fact "if multiple projects are given"
                    (subject/get-interesting [{:url "http://a"}
                                              {:url "http://b"}]) => irrelevant
                    (provided
                      (pmap anything anything) => irrelevant))

              (fact "unless only one project is given"
                    (subject/get-interesting [{:url "http://a"}]) => irrelevant
                    (provided
                      (pmap anything anything) => irrelevant :times 0
                      (subject/fetch-interesting anything) => irrelevant)))

       (fact "handles no tray id being given"
             (subject/get-interesting [{:included ["project"]
                                        :url      valid-url}]) =>
             (contains (list (contains {:tray-id nil})))
             (provided
               (subject/fetch-tray anything) => [{:project-id "project"
                                                  :prognosis  :sick}]))

       (fact "adds fetched time"
             (subject/get-interesting [{:included ["project"]
                                        :url      valid-url}]) =>
             (contains (list (contains {:fetched-time anything})))
             (provided
               (subject/fetch-tray anything) => [{:project-id "project"
                                                  :prognosis  :sick}]))

       (fact "does not call the CI server if no projects are selected"
             (subject/get-interesting [{:included []
                                        :url      valid-url}]) => irrelevant
             (provided
               (subject/fetch-tray anything) => anything :times 0)))

(facts "gets the server type"
       (fact "converts known server value to a symbol"
             (subject/get-server-type {:server-type "go"}) => :go)

       (fact "auto detects if blank"
             (subject/get-server-type {:server-type ""
                                       :url         "some-url"}) => ..server..
             (provided
               (servers/detect-server "some-url") => ..server..))

       (fact "auto detects if unknown value"
             (subject/get-server-type {:server-type "foo-bar"
                                       :url         "some-url"}) => ..server..
             (provided
               (servers/detect-server "some-url") => ..server..)))

(facts "validating the URL"
       (fact (subject/validate-scheme {:url "http://bleh"}) => irrelevant)
       (fact (subject/validate-scheme {:url "https://bleh"}) => irrelevant)
       (fact (subject/validate-scheme {:url "gopher://bleh"}) => (throws Exception))
       (fact (subject/validate-scheme nil) => (throws Exception)))
