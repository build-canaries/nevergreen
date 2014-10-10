(ns build-monitor-clj.parser-test
  (:require [build-monitor-clj.parser :as subject]
            [midje.sweet :refer :all]))

(facts "will split project names"
       (fact "names with hyphens and underscores go to spaces"
             (subject/sentanceize "first_second-third-fourth") => "first second third fourth")

       (fact "names with camelCase go to spaces"
             (subject/sentanceize "firstSecondThird") => "first Second Third"
             (subject/sentanceize "FirstSecondThird") => "First Second Third")

       (fact "Acroynms are not split"
             (subject/sentanceize "ABC") => "ABC"
             (subject/sentanceize "somethingEndingWithABC") => "something Ending With ABC"))

(fact "will split project name to seperate attributes in map"
      (subject/extract-name "name1 :: test :: deploy")
      => {:raw-name "name1" :name "name1" :stage "test" :job "deploy"})

(tabular "will say if the build is healthy"
         (fact (subject/extract-health {:lastBuildStatus ?status :activity ?activity}) => {:prognosis ?healthy})
         ?status ?activity ?healthy
         "Success" "Sleeping" "healthy"
         "Success" "Building" "healthy-building"
         "Failure" "Sleeping" "sick"
         "Failure" "Building" "sick-building"
         "random" "random" "unknown")

(fact "can filter out green projects"
      (subject/get-interesting-projects anything) =>
      [{:prognosis "healthy-building"}
       {:prognosis "sick-building"}
       {:prognosis "sick"}]
      (provided
        (subject/get-projects anything) => [{:prognosis "healthy-building"}
                                            {:prognosis "sick-building"}
                                            {:prognosis "healthy"}
                                            {:prognosis "sick"}]))

(facts "integration tests"
       (fact "will turn xml to map"
             (first (:content (subject/to-map "resources/test_data.xml")))
             => (contains {:attrs {:name            "success-sleeping-project :: stage1 :: job1"
                                   :activity        "Sleeping"
                                   :lastBuildStatus "Success"}}))

       (fact "will create list of projects"
             (first (subject/get-projects "resources/test_data.xml"))
             => {:raw-name        "success-sleeping-project"
                 :name            "success sleeping project"
                 :stage           "stage1"
                 :job             "job1"
                 :activity        "Sleeping"
                 :prognosis       "healthy"
                 :lastBuildStatus "Success"}))