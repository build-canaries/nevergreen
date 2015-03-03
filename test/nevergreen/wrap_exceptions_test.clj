(ns nevergreen.wrap-exceptions-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-exceptions :as subject])
  (:import (clojure.lang ExceptionInfo)))

(fact "normal exceptions should be convereted to 500 status with the message propagated"
      ((subject/wrap-exceptions (fn [_]
                                  (throw (Exception. "message")))) {})
      => (contains {:status 500 :body "message"}))

(fact "clojure ExceptionInfo should be convereted to 500 status with the http status returned"
      ((subject/wrap-exceptions (fn [_]
                                  (throw (ExceptionInfo. "message" {:object {:status 404}})))) {})
      => (contains {:status 500 :body "404"}))