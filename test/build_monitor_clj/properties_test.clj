(ns build-monitor-clj.properties-test
  (:require [build-monitor-clj.properties :as subject]
            [midje.sweet :refer :all]))

(fact "included projects"
      (subject/included-projects) => ["foo" "bar"]
      (provided
        (subject/env "INCLUDED_PROJECTS") => "foo,bar"))