(ns nevergreen.api-test
  (:require [midje.sweet :refer :all]
            [nevergreen.api :as subject]
            [clj-cctray.core :as parser]))

(fact "it finds interesting projects"
      (subject/get-interesting-projects {:includedProjects ["project-1"]}) => (list {:name "project-1" :prognosis :sick})
      (provided
        (parser/get-projects anything anything anything) => [{:name "project-1" :prognosis :sick}]))

(facts "we can detect if we are using a go server"
       (fact "it is not a go server"
             (subject/get-all-projects anything) => (contains {:server ""})
             (provided
               (parser/get-projects anything :options [:normalise]) => [{:name "project-1"}]))

       (fact "it is a go server"
             (subject/get-all-projects anything) => (contains {:server "go"})
             (provided
               (parser/get-projects anything :options anything) => [{:name "project-1"} {:name "project-1 :: job1"}])))

(facts "parses requested serverType"

       (fact "converts go server param to symbol"
             (subject/options-from-config {:serverType "go"}) => [:normalise :go])
       (fact "gives nil for empty string"
             (subject/options-from-config {:serverType ""}) => [:normalise]))