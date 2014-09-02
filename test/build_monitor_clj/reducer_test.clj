(ns build-monitor-clj.reducer-test
  (:require [midje.sweet :refer :all]
            [build-monitor-clj.reducer :as subject]))

(facts "aggregates project results"
       (facts "given two projects with the same name"
              (fact "when both have same prognosis return only one"
                    (subject/aggregate [{:name            "project1"
                                         :stage           "stage1"
                                         :job             "job1"
                                         :prognosis       "healthy"}
                                        {:name            "project1"
                                         :stage           "stage2"
                                         :job             "job2"
                                         :prognosis       "healthy"}]) => [{:name            "project1"
                                                                            :stage           "stage2"
                                                                            :job             "job2"
                                                                            :prognosis       "healthy"}])))
