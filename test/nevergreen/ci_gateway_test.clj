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

  (testing "sets the auth header if a username and password are given"
    (binding [subject/http-get (fn [_ additional-headers]
                                 (is (= {"Authorization" "Basic c29tZS11c2VybmFtZTpzb21lLWRlY3J5cHRlZC1wYXNzd29yZA=="}
                                        additional-headers)))
              subject/decrypt (constantly "some-decrypted-password")]
      (subject/fetch-cctray {:url "http://some-url" :username "some-username" :password "some-encrypted-password"})))

  (testing "doesn't set the auth header if no username or password is given"
    (binding [subject/http-get (fn [_ additional-headers]
                                 (is (nil? additional-headers)))
              subject/decrypt (constantly "some-decrypted-password")]
      (subject/fetch-cctray {:url "http://some-url"}))))
