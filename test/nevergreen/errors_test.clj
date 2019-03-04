(ns nevergreen.errors-test
  (:require [clojure.test :refer :all]
            [nevergreen.errors :as subject]))

(deftest is-error?
  (testing "is-error returns true when the given thing is an error"
    (is (true? (subject/is-error? (subject/create-error "some-text" "some-url"))))))

(deftest create-error
  (testing "create-error can be created with a message"
    (is (= {:error-message "some-text"
            :url           "some-url"
            :is-error      true}
           (subject/create-error "some-text" "some-url"))))

  (testing "create-error can be created with an exception"
    (is (= {:error-message "some-message"
            :url           "some-url"
            :is-error      true}
           (subject/create-error (ex-info "some-message" {}) "some-url"))))

  (testing "create-error will use the exception class name if it has no message"
    (is (= {:error-message "ExceptionInfo"
            :url           "some-url"
            :is-error      true}
           (subject/create-error (ex-info nil {}) "some-url")))))
