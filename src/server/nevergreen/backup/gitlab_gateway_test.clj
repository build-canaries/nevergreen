(ns nevergreen.backup.gitlab-gateway-test
  (:require [clojure.test :refer :all]
            [nevergreen.backup.gitlab-gateway :as subject]))

(deftest create-snippet

  (testing "allows the URL to be set to support hosted GitLab"
    (binding [subject/*http-post* (fn [url _]
                                  (is (= "https://some-host/api/v4/snippets/" url)))]
      (subject/create-snippet {:description "" :configuration "" :token "" :url "https://some-host"})
      (subject/create-snippet {:description "" :configuration "" :token "" :url "https://some-host/"})))

  (testing "uses the default GitLab API URL if none provided"
    (binding [subject/*http-post* (fn [url _]
                                  (is (= "https://gitlab.com/api/v4/snippets/" url)))]
      (subject/create-snippet {:description "" :configuration "" :token "" :url nil})
      (subject/create-snippet {:description "" :configuration "" :token "" :url ""})))

  (testing "sets the correct body"
    (binding [subject/*http-post* (fn [_ data]
                                  (is (= "{\"title\":\"some-description\",\"visibility\":\"public\",\"file_name\":\"configuration.json\",\"content\":\"some-config\"}"
                                         (:body data))))]
      (subject/create-snippet {:description "some-description" :configuration "some-config" :token "some-token"})))

  (testing "sets the correct mime type"
    (binding [subject/*http-post* (fn [_ data]
                                  (is (= "application/json" (:accept data))))]
      (subject/create-snippet {:description "some-description" :configuration "some-config" :token "some-token"})))

  (testing "sets the correct auth header"
    (binding [subject/*http-post* (fn [_ data]
                                  (is (= {"private_token" "some-token"} (:query-params data))))]
      (subject/create-snippet {:description "some-description" :configuration "some-config" :token "some-token"}))))

(deftest update-snippet

  (testing "allows the URL to be set to support hosted GitLab"
    (binding [subject/*http-put* (fn [url _]
                                 (is (= "https://some-host/api/v4/snippets/some-id" url)))]
      (subject/update-snippet {:description "" :configuration "" :token "" :id "some-id" :url "https://some-host"})
      (subject/update-snippet {:description "" :configuration "" :token "" :id "some-id" :url "https://some-host/"})))

  (testing "uses the default GitLab API URL if none provided"
    (binding [subject/*http-put* (fn [url _]
                                 (is (= "https://gitlab.com/api/v4/snippets/some-id" url)))]
      (subject/update-snippet {:description "" :configuration "" :token "" :id "some-id" :url nil})
      (subject/update-snippet {:description "" :configuration "" :token "" :id "some-id" :url ""})))

  (testing "sets the correct body"
    (binding [subject/*http-put* (fn [_ data]
                                 (is (= "{\"title\":\"some-description\",\"visibility\":\"public\",\"file_name\":\"configuration.json\",\"content\":\"some-config\"}"
                                        (:body data))))]
      (subject/update-snippet {:description "some-description" :configuration "some-config" :token "some-token" :id "some-id"})))

  (testing "sets the correct mime type"
    (binding [subject/*http-put* (fn [_ data]
                                 (is (= "application/json" (:accept data))))]
      (subject/update-snippet {:description "some-description" :configuration "some-config" :token "some-token" :id "some-id"})))

  (testing "sets the auth query"
    (binding [subject/*http-put* (fn [_ data]
                                 (is (= {"private_token" "some-token"} (:query-params data))))]
      (subject/update-snippet {:description "some-description" :configuration "some-config" :token "some-token" :id "some-id"}))))

(deftest get-snippet-meta

  (testing "allows the URL to be set to support hosted GitLab"
    (binding [subject/*http-get* (fn [url _]
                                 (is (= "https://some-host/api/v4/snippets/some-id" url)))]
      (subject/get-snippet-meta {:id "some-id" :url "https://some-host"})
      (subject/get-snippet-meta {:id "some-id" :url "https://some-host/"})))

  (testing "allows the URL to be set to support hosted GitLab"
    (binding [subject/*http-get* (fn [url _]
                                 (is (= "https://gitlab.com/api/v4/snippets/some-id" url)))]
      (subject/get-snippet-meta {:id "some-id"})
      (subject/get-snippet-meta {:id "some-id" :url ""})))

  (testing "sets the correct mime type"
    (binding [subject/*http-get* (fn [_ data]
                                 (is (= "application/json" (:accept data))))]
      (subject/get-snippet-meta {:id "some-id"}))))

(deftest get-snippet-content

  (testing "allows the URL to be set to support hosted GitLab"
    (binding [subject/*http-get* (fn [url _]
                                 (is (= "https://some-host/api/v4/snippets/some-id/raw" url)))]
      (subject/get-snippet-content {:id "some-id" :url "https://some-host"})
      (subject/get-snippet-content {:id "some-id" :url "https://some-host/"})))

  (testing "allows the URL to be set to support hosted GitLab"
    (binding [subject/*http-get* (fn [url _]
                                 (is (= "https://gitlab.com/api/v4/snippets/some-id/raw" url)))]
      (subject/get-snippet-content {:id "some-id"})
      (subject/get-snippet-content {:id "some-id" :url ""})))

  (testing "sets the correct mime type"
    (binding [subject/*http-get* (fn [_ data]
                                 (is (= "application/json" (:accept data))))]
      (subject/get-snippet-content {:id "some-id"})))

  (testing "gets the response as a string as the server shouldn't know what format the data is"
    (binding [subject/*http-get* (fn [_ data]
                                 (is (nil? (:as data))))]
      (subject/get-snippet-content {:id "some-id"}))))
