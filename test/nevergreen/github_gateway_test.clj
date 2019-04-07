(ns nevergreen.github-gateway-test
  (:require [clojure.test :refer :all]
            [nevergreen.github-gateway :as subject]))

(deftest create-gist

  (testing "uses the correct URL"
    (binding [subject/http-post (fn [url _]
                                  (is (= "https://api.github.com/gists" url)))]
      (subject/create-gist {:description "some-description" :configuration "some-config" :token "some-token"})))

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

  (testing "uses the correct URL"
    (binding [subject/http-patch (fn [url _]
                                   (is (= "https://api.github.com/gists/some-id" url)))]
      (subject/update-gist {:description "some-description" :configuration "some-config" :token "some-token" :id "some-id"})))

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

  (testing "uses the correct URL"
    (binding [subject/http-get (fn [url _]
                                 (is (= "https://api.github.com/gists/some-id" url)))]
      (subject/get-gist "some-id")))

  (testing "sets the correct mime type"
    (binding [subject/http-get (fn [_ data]
                                 (is (= "application/vnd.github.v3+json"
                                        (:accept data))))]
      (subject/get-gist "some-id"))))

(deftest get-truncated-file

  (testing "uses the given URL (as it comes from getting the gist)"
    (binding [subject/http-get (fn [url _]
                                 (is (= "some-url" url)))]
      (subject/get-truncated-file "some-url")))

  (testing "sets the correct mime type"
    (binding [subject/http-get (fn [_ data]
                                 (is (= "text/plain; charset=utf-8"
                                        (:accept data))))]
      (subject/get-truncated-file "some-url"))))
