(ns nevergreen.api-test
  (:require [midje.sweet :refer :all]
            [nevergreen.api :as subject]
            [clj-cctray.core :as parser]))

(fact "it finds interesting projects"
      (subject/get-interesting-projects {:includedProjects ["project-1"]}) => (list {:name "project-1" :prognosis :sick})
      (provided
        (parser/get-projects anything anything anything) => [{:name "project-1" :prognosis :sick}]))