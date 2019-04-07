(ns nevergreen.api.import-test
  (:require [clojure.test :refer :all]
            [nevergreen.api.import :as subject])
  (:import (clojure.lang ExceptionInfo)))

(defn- gist [truncated size]
  {:files       {:configuration.json {:truncated truncated
                                      :size      size
                                      :raw_url   "some-url"
                                      :content   "some-configuration"}}
   :description "some-description"})

(deftest import-config

  (testing "github"

    (testing "returns the response for a valid gist"
      (binding [subject/get-gist (constantly (gist false 12345))]
        (is (= {:id            "some-id"
                :description   "some-description"
                :where         "github"
                :configuration "some-configuration"}
               (subject/import-config {:from "github" :id "some-id"})))))

    (testing "returns the response for a valid truncated gist"
      (binding [subject/get-gist (constantly (gist true 12345))
                subject/get-truncated-file (constantly "some-full-configuration")]
        (is (= {:id            "some-id"
                :description   "some-description"
                :where         "github"
                :configuration "some-full-configuration"}
               (subject/import-config {:from "github" :id "some-id"})))))

    (testing "throws an error if the configuration is too large to fetch without git cloning (> 10MB)"
      (binding [subject/get-gist (constantly (gist true 10485761))
                subject/get-truncated-file (constantly "some-full-configuration")]
        (is (thrown-with-msg? ExceptionInfo
                              #"gist configuration.json file is too big to fetch without git cloning, size 10485761 bytes"
                              (subject/import-config {:from "github" :id "some-id"})))))))
