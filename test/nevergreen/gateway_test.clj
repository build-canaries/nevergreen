(ns nevergreen.gateway-test
  (:require [clojure.test :refer :all]
            [nevergreen.gateway :as subject])
  (:import (java.net UnknownHostException URISyntaxException ConnectException SocketTimeoutException)
           (org.apache.http.concurrent BasicFuture FutureCallback)
           (org.apache.http.message BasicHttpResponse BasicStatusLine)
           (org.apache.http HttpVersion)
           (org.apache.http.entity StringEntity)
           (java.util.concurrent TimeoutException TimeUnit Future)))


(defn- completed-future [result]
  (let [future-call-back (reify FutureCallback
                           (completed [_ _])
                           (failed [_ _])
                           (cancelled [_]))
        basic-future (BasicFuture. future-call-back)
        status-line (BasicStatusLine. HttpVersion/HTTP_0_9 200 "OK")
        response (BasicHttpResponse. status-line)]
    (.setEntity response (StringEntity. result))
    (.completed basic-future response)
    basic-future))

(defn- failed-future [exception]
  (let [future-call-back (reify FutureCallback
                           (completed [_ _])
                           (failed [_ _])
                           (cancelled [_]))
        basic-future (BasicFuture. future-call-back)]
    (.failed basic-future exception)
    basic-future))

(deftest http-get
  (testing "adds additional data"
    (binding [subject/client-get (fn [_ data]
                                   (is (contains? data :headers))
                                   (is (contains? (:headers data) "Authentication"))
                                   (is (= "Basic some-password" (get (:headers data) "Authentication")))
                                   (completed-future "result"))]
      (subject/http-get "http://some-url" {:headers {"Authentication" "Basic some-password"}})))

  (testing "returns the body"
    (binding [subject/client-get (constantly (completed-future "some-body"))]
      (is (= "some-body" (slurp (subject/http-get "http://some-url" {}))))))

  (testing "uses the given url"
    (binding [subject/client-get (fn [url _]
                                   (is (= "http://some-url" url))
                                   (completed-future "result"))]
      (subject/http-get "http://some-url" {})))

  (testing "throws an error for unknown hosts"
    (binding [subject/client-get (fn [_ _] (failed-future (UnknownHostException. "some-host: unknown error")))]
      (is (thrown-with-msg? Exception
                            #"some-host is an unknown host, is the URL correct?"
                            (subject/http-get "http://some-host" {})))))

  (testing "throws an error for bad uri syntax"
    (binding [subject/client-get (fn [_ _] (failed-future (URISyntaxException. "some-url" "Illegal character in authority at index 0")))]
      (is (thrown-with-msg? Exception
                            #"URL is invalid. Illegal character in authority at index 0: some-url"
                            (subject/http-get "http://some-url" {})))))

  (testing "throws an error for connect exception"
    (binding [subject/client-get (fn [_ _] (failed-future (ConnectException. "Connection refused (Connection refused)")))]
      (is (thrown-with-msg? Exception
                            #"Connection refused, is the URL correct?"
                            (subject/http-get "http://some-url" {})))))

  (testing "throws an error when the CI server responds with an error but blank reason phrase"
    (binding [subject/client-get (fn [_ _] (failed-future (ex-info "irrelevant" {:reason-phrase "" :status 404})))]
      (is (thrown-with-msg? Exception
                            #"Server returned a 404"
                            (subject/http-get "http://some-url" {})))))

  (testing "throws an error when the CI server responds with an error"
    (binding [subject/client-get (fn [_ _] (failed-future (ex-info "irrelevant" {:reason-phrase "some-error"})))]
      (is (thrown-with-msg? Exception
                            #"Server returned a some-error"
                            (subject/http-get "http://some-url" {})))))

  (testing "throws an unknown error when the CI server responds with an error but no reason"
    (binding [subject/client-get (fn [_ _] (failed-future (ex-info "irrelevant" {})))]
      (is (thrown-with-msg? Exception
                            #"Server returned a Unknown error"
                            (subject/http-get "http://some-url" {})))))

  (testing "throws an unknown error when SocketTimeoutException exception occurs"
    (binding [subject/client-get (fn [_ _] (failed-future (SocketTimeoutException. "Timeout occurred")))]
      (is (thrown-with-msg? Exception
                            #"Connection timeout"
                            (subject/http-get "http://some-url" {})))))

  (testing "throws an an error when server did not respond in time and cancel the request"
    (let [call-count (atom 0)
          timeout-future (proxy [Future] []
                   (get [timeout unit]
                     (is (= 50 timeout))
                     (is (= unit TimeUnit/SECONDS))
                     (throw (TimeoutException.)))
                   (cancel [interrupt]
                     (is (= true interrupt))
                     (swap! call-count inc)
                     true))]
      (binding [subject/client-get (fn [_ _] timeout-future)]
        (is (thrown-with-msg? Exception
                              #"Deadline timeout"
                              (subject/http-get "http://some-url" {})))
        (is (= 1 @call-count))))))
