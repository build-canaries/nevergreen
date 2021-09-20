(ns nevergreen.backup.import-test
  (:require [clojure.test :refer :all]
            [nevergreen.backup.import :as subject]))

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

  (testing "decrypts the token if it is encrypted"
    (binding [subject/*decrypt* (constantly "some-token")
              subject/*get-snippet-meta* (constantly (snippet-meta))
              subject/*get-snippet-content* (fn [data]
                                            (is (= "some-token"
                                                   (:token data))))]
      (subject/import-config {:from "gitlab" :encrypted-token "encrypted-token"})))

  (testing "custom"

    (testing "returns the response"
      (binding [subject/*get-custom* (constantly "some-configuration")]
        (is (= {:where         "custom"
                :configuration "some-configuration"}
               (subject/import-config {:from "custom" :url "http://some-url"}))))))

  (testing "github"

    (testing "returns the response for a valid gist"
      (binding [subject/*get-gist* (constantly (gist false 12345))]
        (is (= {:id            "some-id"
                :description   "some-description"
                :where         "github"
                :configuration "some-configuration"}
               (subject/import-config {:from "github" :id "some-id"})))))

    (testing "returns the response for a valid truncated gist"
      (binding [subject/*get-gist* (constantly (gist true 12345))
                subject/*get-truncated-file* (constantly "some-full-configuration")]
        (is (= {:id            "some-id"
                :description   "some-description"
                :where         "github"
                :configuration "some-full-configuration"}
               (subject/import-config {:from "github" :id "some-id"})))))

    (testing "throws an error if the gist does not contain the configuration.json file"
      (binding [subject/*get-gist* (constantly {})]
        (try
          (subject/import-config {:from "github" :id "some-id"})
          (assert false "expected exception not thrown")
          (catch Exception e
            (is (= "gist does not contain the required configuration.json file" (.getMessage e)))
            (is (= {:id "some-id" :status 422} (ex-data e)))))))

    (testing "throws an error if the configuration is too large to fetch without git cloning (> 10MB)"
      (binding [subject/*get-gist* (constantly (gist true 10485761))]
        (try
          (subject/import-config {:from "github" :id "some-id"})
          (assert false "expected exception not thrown")
          (catch Exception e
            (is (= "gist configuration.json file is too big to fetch without git cloning, size 10485761 bytes" (.getMessage e)))
            (is (= {:id "some-id" :status 422} (ex-data e))))))))

  (testing "gitlab"

    (testing "returns the response for a valid snippet"
      (binding [subject/*get-snippet-meta* (constantly (snippet-meta))
                subject/*get-snippet-content* (constantly "some-configuration")]
        (is (= {:id            "some-id"
                :description   "some-description"
                :where         "gitlab"
                :configuration "some-configuration"}
               (subject/import-config {:from "gitlab" :id "some-id"})))))

    (testing "throws an error if the snippet does not contain the configuration.json file"
      (binding [subject/*get-snippet-meta* (constantly {})]
        (try
          (subject/import-config {:from "gitlab" :id "some-id"})
          (assert false "expected exception not thrown")
          (catch Exception e
            (is (= "snippet does not contain the required configuration.json file" (.getMessage e)))
            (is (= {:id "some-id" :status 422} (ex-data e))))))))

  (testing "trying to import from an unknown location throws an exception with a bad request status"
    (try
      (subject/import-config {:from "unknown"})
      (assert false "expected exception not thrown")
      (catch Exception e
        (is (= "importing from \"unknown\" is not supported" (.getMessage e)))
        (is (= {:status 400} (ex-data e)))))))
