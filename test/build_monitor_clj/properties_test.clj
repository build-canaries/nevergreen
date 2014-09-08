(ns build-monitor-clj.properties-test
  (:require [build-monitor-clj.properties :as subject]
            [environ.core :refer [env]]
            [midje.sweet :refer :all]))

(facts "included projects"
       (fact "parse simple case"
             (subject/included-projects) => ["foo" "bar"]
             (provided
               (env :included-projects) => "foo,bar"))

       (fact "trims spaces from begining and end"
             (subject/included-projects) => ["foo" "bar bar"]
             (provided
               (env :included-projects) => " foo , bar bar ")))

(facts "excluded projects"
      (fact "gets list of excluded"
            (subject/excluded-projects) => ["foo" "bar"]
            (provided
              (env :excluded-projects) => "foo , bar"))

      (fact "trims spaces from begining and end"
            (subject/included-projects) => ["foo" "bar bar"]
            (provided
              (env :included-projects) => " foo , bar bar ")))