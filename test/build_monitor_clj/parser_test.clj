(ns build-monitor-clj.parser-test
  (:require [build-monitor-clj.parser :as subject]
            [midje.sweet :refer :all]
            [build-monitor-clj.parser :as subject]))

(fact "Will split projec names with hyphens and underscores in them"
      (subject/sentanceize "first_second-third") => "first second third")

(fact "will split project name to seperate attributes in map"
      (subject/extract-name "name1 :: test :: deploy")
      => {:name "name1" :pipeline "test" :stage "deploy"})

(tabular "will say if the build is healthy"
         (fact (subject/extract-health {:lastBuildStatus ?status :activity ?activity}) => {:prognosis ?healthy})
         ?status   ?activity  ?healthy
         "Success" "Sleeping" "healthy"
         "Success" "Building" "healthy-building"
         "Failure" "Sleeping" "sick"
         "Failure" "Building" "sick-building"
         "random"  "random"   "unknown")

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
             => (contains {:attrs {:name            "success-sleeping-project :: pipeline1 :: stage1"
                                   :activity        "Sleeping"
                                   :lastBuildStatus "Success"}}))

       (fact "will create list of projects"
             (first (subject/get-projects "resources/test_data.xml"))
             => {:name            "success sleeping project"
                 :pipeline        "pipeline1"
                 :activity        "Sleeping"
                 :stage           "stage1"
                 :prognosis       "healthy"
                 :lastBuildStatus "Success"}))