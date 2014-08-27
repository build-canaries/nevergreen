(ns build-monitor-clj.parser-test
  (:require [build-monitor-clj.parser :as subject]
            [midje.sweet :refer :all]))

(fact "will turn xml to map"
      (:content (subject/to-map "resources/test_data.xml")) => (contains
                                                                 [(contains {:attrs {:name            "name1 :: pipeline1 :: stage1"
                                                                                     :lastBuildStatus "Success"}})]))

(fact "will split project name to seperate attributes in map"
      (subject/extract-name "name1 :: test :: deploy") => {:name "name1" :pipeline "test" :stage "deploy"})

(fact "will create list of projects"
      (subject/get-projects "resources/test_data.xml") => [{:name "name1" :pipeline "pipeline1" :stage "stage1" :lastBuildStatus "Success"}
                                                           {:name "name2" :pipeline "pipeline2" :stage "stage2" :lastBuildStatus "Success"}
                                                           {:name "name3" :pipeline "pipeline3" :stage "stage3" :lastBuildStatus "Failure"}])
