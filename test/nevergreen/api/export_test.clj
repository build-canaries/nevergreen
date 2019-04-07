(ns nevergreen.api.export-test
  (:require [clojure.test :refer :all]
            [nevergreen.api.export :as subject]))

(deftest export-config

  (testing "github"

    (testing "creates a gist if no id is provided"
      (binding [subject/create-gist (constantly {:id "some-id"})]
        (is (= {:id "some-id"}
               (subject/export-config {:where "github"})))))

    (testing "updates a gist if an id is provided"
      (binding [subject/update-gist (constantly {:id "some-id"})]
        (is (= {:id "some-id"}
               (subject/export-config {:where "github" :id "some-id"})))))))
