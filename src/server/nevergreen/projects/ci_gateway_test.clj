(ns nevergreen.projects.ci-gateway-test
  (:require [clojure.test :refer :all]
            [nevergreen.projects.ci-gateway :as subject])
  (:import (clojure.lang ExceptionInfo)))

(deftest fetch-cctray

  (testing "throws an error if the URL is blank"
    (is (thrown-with-msg? ExceptionInfo
                          #"URL is blank, a http\(s\) URL must be provided"
                          (subject/fetch-cctray {:url ""}))))

  (testing "throws an error if the URL is not http(s)"
    (is (thrown-with-msg? ExceptionInfo
                          #"URL is invalid, only http\(s\) URLs are supported"
                          (subject/fetch-cctray {:url "ftp://some-url"}))))

  (testing "sets the auth header if auth type is basic after decrypting the password"
    (binding [subject/*http-get* (fn [_ data]
                                   (is (= {"Authorization" "Basic c29tZS11c2VybmFtZTpzb21lLWRlY3J5cHRlZC1wYXNzd29yZA=="}
                                          (:headers data))))
              subject/*decrypt* (constantly "some-decrypted-password")]
      (subject/fetch-cctray {:url                "http://some-url"
                             :auth-type          "basic"
                             :username           "some-username"
                             :encrypted-password "some-encrypted-password"})))

  (testing "sets the auth header if auth type is basic using the encrypted password over an unencrypted password"
    (binding [subject/*http-get* (fn [_ data]
                                   (is (= {"Authorization" "Basic c29tZS11c2VybmFtZTpzb21lLWRlY3J5cHRlZC1wYXNzd29yZA=="}
                                          (:headers data))))
              subject/*decrypt* (constantly "some-decrypted-password")]
      (subject/fetch-cctray {:url                "http://some-url"
                             :auth-type          "basic"
                             :username           "some-username"
                             :encrypted-password "some-encrypted-password"
                             :password           "unencrypted-password"})))

  (testing "sets the auth header if auth type is basic using the given unencrypted password"
    (binding [subject/*http-get* (fn [_ data]
                                   (is (= {"Authorization" "Basic c29tZS11c2VybmFtZTp1bmVuY3J5cHRlZC1wYXNzd29yZA=="}
                                          (:headers data))))]
      (subject/fetch-cctray {:url       "http://some-url"
                             :auth-type "basic"
                             :username  "some-username"
                             :password  "unencrypted-password"})))

  (testing "sets the auth header if auth type is token after decrypting"
    (binding [subject/*http-get* (fn [_ data]
                                   (is (= {"Authorization" "Bearer some-decrypted-token"}
                                          (:headers data))))
              subject/*decrypt* (constantly "some-decrypted-token")]
      (subject/fetch-cctray {:url                    "http://some-url"
                             :auth-type              "token"
                             :encrypted-access-token "some-token"})))

  (testing "sets the auth header if auth type is token using the encrypted token over the unencrypted token"
    (binding [subject/*http-get* (fn [_ data]
                                   (is (= {"Authorization" "Bearer some-decrypted-token"}
                                          (:headers data))))
              subject/*decrypt* (constantly "some-decrypted-token")]
      (subject/fetch-cctray {:url                    "http://some-url"
                             :auth-type              "token"
                             :encrypted-access-token "some-token"
                             :access-token           "unencrypted-token"})))

  (testing "sets the auth header if auth type is token using the given unencrypted access token"
    (binding [subject/*http-get* (fn [_ data]
                                   (is (= {"Authorization" "Bearer unencrypted-token"}
                                          (:headers data))))]
      (subject/fetch-cctray {:url          "http://some-url"
                             :auth-type    "token"
                             :access-token "unencrypted-token"})))

  (testing "doesn't set the auth header if auth is none"
    (binding [subject/*http-get* (fn [_ data]
                                   (is (nil? (:headers data))))
              subject/*decrypt* (constantly "some-decrypted-password")]
      (subject/fetch-cctray {:url       "http://some-url"
                             :auth-type "none"}))))
