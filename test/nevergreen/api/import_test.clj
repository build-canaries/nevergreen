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

(defn- snippet-meta []
  {:title      "some-description",
   :visibility "public",
   :file_name  "configuration.json"})

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

    (testing "throws an error if the gist does not contain the configuration.json file"
      (binding [subject/get-gist (constantly {})]
        (is (thrown-with-msg? ExceptionInfo
                              #"gist does not contain the required configuration.json file"
                              (subject/import-config {:from "github" :id "some-id"})))))

    (testing "throws an error if the configuration is too large to fetch without git cloning (> 10MB)"
      (binding [subject/get-gist (constantly (gist true 10485761))]
        (is (thrown-with-msg? ExceptionInfo
                              #"gist configuration.json file is too big to fetch without git cloning, size 10485761 bytes"
                              (subject/import-config {:from "github" :id "some-id"}))))))

  (testing "gitlab"

    (testing "returns the response for a valid snippet"
      (binding [subject/get-snippet-meta (constantly (snippet-meta))
                subject/get-snippet-content (constantly "some-configuration")]
        (is (= {:id            "some-id"
                :description   "some-description"
                :where         "gitlab"
                :configuration "some-configuration"}
               (subject/import-config {:from "gitlab" :id "some-id"})))))

    (testing "throws an error if the snippet does not contain the configuration.json file"
      (binding [subject/get-snippet-meta (constantly {})]
        (is (thrown-with-msg? ExceptionInfo
                              #"snippet does not contain the required configuration.json file"
                              (subject/import-config {:from "gitlab" :id "some-id"})))))))
