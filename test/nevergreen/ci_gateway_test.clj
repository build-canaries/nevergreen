(ns nevergreen.ci-gateway-test
  (:require [clojure.test :refer :all]
            [nevergreen.ci-gateway :as subject])
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

  (testing "sets the auth header if auth type is basic"
    (binding [subject/http-get (fn [_ data]
                                 (is (= {"Authorization" "Basic c29tZS11c2VybmFtZTpzb21lLWRlY3J5cHRlZC1wYXNzd29yZA=="}
                                        (:headers data))))
              subject/decrypt (constantly "some-decrypted-password")]
      (subject/fetch-cctray {:url "http://some-url" :auth-type "basic" :username "some-username" :password "some-encrypted-password"})))

  (testing "sets the auth header if auth type is token"
    (binding [subject/http-get (fn [_ data]
                                 (is (= {"Authorization" "Bearer some-decrypted-token"}
                                        (:headers data))))
              subject/decrypt (constantly "some-decrypted-token")]
      (subject/fetch-cctray {:url "http://some-url" :auth-type "token" :access-token "some-token"})))

  (testing "doesn't set the auth header if auth is none"
    (binding [subject/http-get (fn [_ data]
                                 (is (nil? (:headers data))))
              subject/decrypt (constantly "some-decrypted-password")]
      (subject/fetch-cctray {:url "http://some-url" :auth-type "none"}))))
