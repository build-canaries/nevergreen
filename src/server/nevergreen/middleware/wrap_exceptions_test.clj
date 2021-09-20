(ns nevergreen.middleware.wrap-exceptions-test
  (:require [clojure.test :refer :all]
            [nevergreen.middleware.wrap-exceptions :as subject]
            [nevergreen.errors :as errors]))

(deftest wrap-exceptions

  (binding [errors/*now* (constantly "some-time")]

    (testing "exceptions should be get a 500 status and a generic message"
      (let [app (fn [_] (throw (Exception. "message")))
            req {:uri "some-url"}
            res ((subject/wrap-exceptions app) req)]
        (is (= (errors/error-response 500 "An unhandled exception was thrown" "some-url") res))))

    (testing "exception infos should use the message and status from the exception"
      (let [app (fn [_] (throw (ex-info "some-message" {:status 502})))
            req {:uri "some-url"}
            res ((subject/wrap-exceptions app) req)]
        (is (= (errors/error-response 502 "some-message" "some-url") res))))

    (testing "returns 500 if the exception info does not contain a status"
      (let [app (fn [_] (throw (ex-info "some-message" {})))
            req {:uri "some-url"}
            res ((subject/wrap-exceptions app) req)]
        (is (= (errors/error-response 500 "some-message" "some-url") res))))))
