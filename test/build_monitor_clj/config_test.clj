(ns build-monitor-clj.config-test
  (:require [build-monitor-clj.config :as subject]
            [environ.core :refer [env]]
            [midje.sweet :refer :all]))

(facts "port"
       (fact "from env"
             (subject/port) => 1337
             (provided
               (env :port) => "1337"))

       (fact "defaults to 5000"
             (subject/port) => 5000))

(facts "included projects"
       (fact "parse simple case"
             (subject/included-projects) => #{"foo" "bar"}
             (provided
               (env :included-projects) => "foo,bar"))

       (fact "trims spaces from begining and end"
             (subject/included-projects) => #{"foo" "bar bar"}
             (provided
               (env :included-projects) => " foo , bar bar "))

       (fact "defaults to include everything"
             (subject/included-projects) => #{".*"}))

(facts "excluded projects"
      (fact "gets list of excluded"
            (subject/excluded-projects) => #{"foo" "bar"}
            (provided
              (env :excluded-projects) => "foo , bar"))

      (fact "trims spaces from begining and end"
            (subject/excluded-projects) => #{"foo" "bar bar"}
            (provided
              (env :excluded-projects) => " foo , bar bar "))

      (fact "defaults to exclude nothing"
            (subject/excluded-projects) => #{}))