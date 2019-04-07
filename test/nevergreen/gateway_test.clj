(ns nevergreen.gateway-test
  (:require [clojure.test :refer :all]
            [nevergreen.gateway :as subject])
  (:import (java.net UnknownHostException URISyntaxException ConnectException)))

(deftest http-get
  (testing "adds additional data"
    (binding [subject/client-get (fn [_ data]
                                   (is (contains? data :headers))
                                   (is (contains? (:headers data) "Authentication"))
                                   (is (= "Basic some-password" (get (:headers data) "Authentication"))))]
      (subject/http-get "http://some-url" {:headers {"Authentication" "Basic some-password"}})))

  (testing "returns the body"
    (binding [subject/client-get (constantly {:status 200 :body "some-body"})]
      (is (= "some-body" (subject/http-get "http://some-url" {})))))

  (testing "uses the given url"
    (binding [subject/client-get (fn [url _]
                                   (is (= "http://some-url" url)))]
      (subject/http-get "http://some-url" {})))

  (testing "throws an error for unknown hosts"
    (binding [subject/client-get (fn [_ _] (throw (UnknownHostException. "some-host: unknown error")))]
      (is (thrown-with-msg? Exception
                            #"some-host is an unknown host, is the URL correct?"
                            (subject/http-get "http://some-host" {})))))

  (testing "throws an error for bad uri syntax"
    (binding [subject/client-get (fn [_ _] (throw (URISyntaxException. "some-url" "Illegal character in authority at index 0")))]
      (is (thrown-with-msg? Exception
                            #"URL is invalid. Illegal character in authority at index 0: some-url"
                            (subject/http-get "http://some-url" {})))))

  (testing "throws an error for connect exception"
    (binding [subject/client-get (fn [_ _] (throw (ConnectException. "Connection refused (Connection refused)")))]
      (is (thrown-with-msg? Exception
                            #"Connection refused, is the URL correct?"
                            (subject/http-get "http://some-url" {})))))

  (testing "throws an error when the CI server responds with an error but blank reason phrase"
    (binding [subject/client-get (fn [_ _] (throw (ex-info "irrelevant" {:reason-phrase "" :status 404})))]
      (is (thrown-with-msg? Exception
                            #"Server returned a 404"
                            (subject/http-get "http://some-url" {})))))

  (testing "throws an error when the CI server responds with an error"
    (binding [subject/client-get (fn [_ _] (throw (ex-info "irrelevant" {:reason-phrase "some-error"})))]
      (is (thrown-with-msg? Exception
                            #"Server returned a some-error"
                            (subject/http-get "http://some-url" {})))))

  (testing "throws an unknown error when the CI server responds with an error but no reason"
    (binding [subject/client-get (fn [_ _] (throw (ex-info "irrelevant" {})))]
      (is (thrown-with-msg? Exception
                            #"Server returned a Unknown error"
                            (subject/http-get "http://some-url" {}))))))
