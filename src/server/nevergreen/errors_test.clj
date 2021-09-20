(ns nevergreen.errors-test
  (:require [clojure.test :refer :all]
            [nevergreen.errors :as subject]))

(deftest is-error?
  (testing "is-error returns true when the given thing is an error"
    (is (true? (subject/is-error? (subject/create-error "some-text" "some-url"))))))

(deftest create-error

  (binding [subject/*now* (constantly "some-time")]

    (testing "create-error can be created with a message"
      (is (= {:description "some-text"
              :web-url     "some-url"
              :timestamp   "some-time"
              :prognosis   :error}
             (subject/create-error "some-text" "some-url"))))

    (testing "create-error can be created with an exception"
      (is (= {:description "some-message"
              :web-url     "some-url"
              :timestamp   "some-time"
              :prognosis   :error}
             (subject/create-error (ex-info "some-message" {}) "some-url"))))

    (testing "create-error will use the exception class name if it has no message"
      (is (= {:description "ExceptionInfo"
              :web-url     "some-url"
              :timestamp   "some-time"
              :prognosis   :error}
             (subject/create-error (ex-info nil {}) "some-url"))))))
