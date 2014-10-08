(ns build-monitor-clj.reducer-test
  (:require [midje.sweet :refer :all]
            [build-monitor-clj.reducer :as subject]
            [build-monitor-clj.config :refer :all]))

(defn project
      [overrides] (merge {:raw-name  "project-1"
                          :name      "project 1"
                          :stage     "stage1"
                          :job       "job1"
                          :prognosis "healthy"} overrides))

(facts "aggregates project results"
       (facts "same project name and stage"
              (fact "when both have same prognosis, only one is returned"
                    (subject/aggregate [(project {:job "job1"})
                                        (project {:job "job2"})])
                    => [(project {:job "job1"})]))

       (facts "same project but different stages"
              (fact "if any stage is sick and none are building then sick is returned"
                    (subject/aggregate [(project {:stage "stage1" :prognosis "healthy"})
                                        (project {:stage "stage2" :prognosis "healthy"})
                                        (project {:stage "stage3" :prognosis "sick"})])
                    => [(project {:stage "stage3" :prognosis "sick"})])

              (fact "if any stage is sick and another is building then sick-building is returned"
                    (subject/aggregate [(project {:stage "stage1" :prognosis "healthy-building"})
                                        (project {:stage "stage2" :prognosis "healthy"})
                                        (project {:stage "stage3" :prognosis "sick"})])
                    => [(project {:stage "stage3" :prognosis "sick-building"})]))

       (fact "projects with different names are both returned"
             (subject/aggregate [(project {:name "one"})
                                 (project {:name "two"})])
             => [(project {:name "one"})
                 (project {:name "two"})]))

(facts "whitelisting"
       (fact "only includes included projects"
             (subject/include-whitelisted-projects [{:raw-name "foo"}
                                                    {:raw-name "bar"}]) => [{:raw-name "foo"}]
             (provided
               (included-projects) => ["foo"]))

       (fact "allows regular expressions"
             (subject/include-whitelisted-projects [{:raw-name "foo"}
                                                    {:raw-name "fwibble"}
                                                    {:raw-name "bar"}]) => [{:raw-name "foo"}
                                                                            {:raw-name "fwibble"}]
             (provided
               (included-projects) => ["f.*"])))

(facts "blacklisting"
       (fact "excludes excluded projects"
             (subject/filter-blacklisted-projects [{:raw-name "foo"}
                                                   {:raw-name "bar"}]) => [{:raw-name "foo"}]
             (provided
               (excluded-projects) => ["bar"]))

       (fact "allows regular expressions"
             (subject/filter-blacklisted-projects [{:raw-name "foo"}
                                                   {:raw-name "fwibble"}
                                                   {:raw-name "bar"}]) => [{:raw-name "bar"}]
             (provided
               (excluded-projects) => ["f.*"])))

(facts "has healthy building project"
       (fact "yes"
             (subject/has-a-healthy-building-project? [(project {:prognosis "healthy"})
                                                       (project {:prognosis "healthy-building"})
                                                       (project {:prognosis "sick"})])
             => true)

       (fact "nope"
             (subject/has-a-healthy-building-project? [(project {:prognosis "healthy"})
                                                       (project {:prognosis "sick-building"})
                                                       (project {:prognosis "sick"})])
             => false))
