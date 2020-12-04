(ns nevergreen.backup.github-gateway-test
  (:require [clojure.test :refer :all]
            [nevergreen.backup.github-gateway :as subject]))

(deftest create-gist

  (testing "allows the URL to be set to support GitHub Enterprise"
    (binding [subject/http-post (fn [url _]
                                  (is (= "https://some-host/gists" url)))]
      (subject/create-gist {:description "" :configuration "" :token "" :url "https://some-host"})
      (subject/create-gist {:description "" :configuration "" :token "" :url "https://some-host/"})))

  (testing "uses the default GitHub API URL if none provided"
    (binding [subject/http-post (fn [url _]
                                  (is (= "https://api.github.com/gists" url)))]
      (subject/create-gist {:description "" :configuration "" :token "" :url nil})
      (subject/create-gist {:description "" :configuration "" :token "" :url ""})))

  (testing "sets the correct body"
    (binding [subject/http-post (fn [_ data]
                                  (is (= "{\"description\":\"some-description\",\"public\":false,\"files\":{\"configuration.json\":{\"content\":\"some-config\"}}}"
                                         (:body data))))]
      (subject/create-gist {:description "some-description" :configuration "some-config" :token "some-token"})))

  (testing "sets the correct mime type"
    (binding [subject/http-post (fn [_ data]
                                  (is (= "application/vnd.github.v3+json"
                                         (:accept data))))]
      (subject/create-gist {:description "some-description" :configuration "some-config" :token "some-token"})))

  (testing "sets the correct auth header"
    (binding [subject/http-post (fn [_ data]
                                  (is (= {"Authorization" "token some-token"}
                                         (:headers data))))]
      (subject/create-gist {:description "some-description" :configuration "some-config" :token "some-token"}))))

(deftest update-gist

  (testing "allows the URL to be set to support GitHub Enterprise"
    (binding [subject/http-patch (fn [url _]
                                   (is (= "https://some-host/gists/some-id" url)))]
      (subject/update-gist {:description "" :configuration "" :token "" :id "some-id" :url "https://some-host"})
      (subject/update-gist {:description "" :configuration "" :token "" :id "some-id" :url "https://some-host/"})))

  (testing "uses the default GitHub API URL if none provided"
    (binding [subject/http-patch (fn [url _]
                                   (is (= "https://api.github.com/gists/some-id" url)))]
      (subject/update-gist {:description "" :configuration "" :token "" :id "some-id" :url nil})
      (subject/update-gist {:description "" :configuration "" :token "" :id "some-id" :url ""})))

  (testing "sets the correct body"
    (binding [subject/http-patch (fn [_ data]
                                   (is (= "{\"description\":\"some-description\",\"public\":false,\"files\":{\"configuration.json\":{\"content\":\"some-config\"}}}"
                                          (:body data))))]
      (subject/update-gist {:description "some-description" :configuration "some-config" :token "some-token" :id "some-id"})))

  (testing "sets the correct mime type"
    (binding [subject/http-patch (fn [_ data]
                                   (is (= "application/vnd.github.v3+json"
                                          (:accept data))))]
      (subject/update-gist {:description "some-description" :configuration "some-config" :token "some-token" :id "some-id"})))

  (testing "sets the correct auth header"
    (binding [subject/http-patch (fn [_ data]
                                   (is (= {"Authorization" "token some-token"}
                                          (:headers data))))]
      (subject/update-gist {:description "some-description" :configuration "some-config" :token "some-token" :id "some-id"}))))

(deftest get-gist

  (testing "allows the URL to be set to support GitHub Enterprise"
    (binding [subject/http-get (fn [url _]
                                 (is (= "https://some-host/gists/some-id" url)))]
      (subject/get-gist "some-id" "https://some-host")
      (subject/get-gist "some-id" "https://some-host/")))

  (testing "allows the URL to be set to support GitHub Enterprise"
    (binding [subject/http-get (fn [url _]
                                 (is (= "https://api.github.com/gists/some-id" url)))]
      (subject/get-gist "some-id" nil)
      (subject/get-gist "some-id" "")))

  (testing "sets the correct mime type"
    (binding [subject/http-get (fn [_ data]
                                 (is (= "application/vnd.github.v3+json"
                                        (:accept data))))]
      (subject/get-gist "some-id" nil))))

(deftest get-truncated-file

  (testing "uses the given URL (as it comes from getting the gist)"
    (binding [subject/http-get (fn [url _]
                                 (is (= "some-url" url)))]
      (subject/get-truncated-file "some-url")))

  (testing "sets the correct mime type"
    (binding [subject/http-get (fn [_ data]
                                 (is (= "text/plain; charset=utf-8"
                                        (:accept data))))]
      (subject/get-truncated-file "some-url")))

  (testing "gets the response as a string as the server shouldn't know what format the data is"
    (binding [subject/http-get (fn [_ data]
                                 (is (nil? (:as data))))]
      (subject/get-truncated-file "some-url"))))
