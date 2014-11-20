(ns nevergreen.reducer-test
  (:require [midje.sweet :refer :all]
            [nevergreen.reducer :as subject]
            [nevergreen.config :refer :all]))

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

(fact "only includes included projects"
      (subject/include-whitelisted-projects ["foo"] [{:name "foo"}
                                                     {:name "bar"}]) => [{:name "foo"}])

(fact "excludes excluded projects"
      (subject/filter-blacklisted-projects ["bar"] [{:name "foo"}
                                                    {:name "bar"}]) => [{:name "foo"}])

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
