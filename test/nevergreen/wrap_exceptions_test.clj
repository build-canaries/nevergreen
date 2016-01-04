(ns nevergreen.wrap-exceptions-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-exceptions :as subject])
  (:import (clojure.lang ExceptionInfo)))

(fact "normal exceptions should be convereted to 500 status with the message propagated"
      ((subject/wrap-exceptions (fn [_]
                                  (throw (Exception. "message")))) {})
      => (contains {:status 500 :body "message"}))

(facts "clojure ExceptionInfo exceptions are assumed to contain the status"
       (fact "404 returns body of Not Found"
             ((subject/wrap-exceptions (fn [_]
                                         (throw (ExceptionInfo. "message" {:status 404})))) {})
             => (contains {:status 404 :body "Not Found"}))

       (fact "401 returns body of Unauthorized"
             ((subject/wrap-exceptions (fn [_]
                                         (throw (ExceptionInfo. "message" {:status 401})))) {})
             => (contains {:status 401 :body "Unauthorized"}))

       (fact "unmapped status returns body of Server Error"
             ((subject/wrap-exceptions (fn [_]
                                         (throw (ExceptionInfo. "message" {:status 0})))) {})
             => (contains {:status 0 :body "Server Error"})))

(fact "ExceptionInfo with no data return 500 Server Error"
      ((subject/wrap-exceptions (fn [_]
                                  (throw (ExceptionInfo. "message" {})))) {})
      => (contains {:status 500 :body "Server Error"}))
