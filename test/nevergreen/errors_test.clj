(ns nevergreen.errors-test
  (:require [midje.sweet :refer :all]
            [nevergreen.errors :as subject]))

(fact "is-error returns true when the given thing is an error"
      (subject/is-error? (subject/create-error "some-text" "some-url")) => true)

(fact "create-error can be created with a message"
      (subject/create-error "some-text" "some-url") => {:error-message "some-text"
                                                        :url           "some-url"
                                                        :is-error      true})

(fact "create-error can be created with an exception"
      (subject/create-error (ex-info "some-message" {}) "some-url") => {:error-message "some-message"
                                                                        :url           "some-url"
                                                                        :is-error      true})

(fact "create-error will use the exception class name if it has no message"
      (subject/create-error (ex-info nil {}) "some-url") => {:error-message "ExceptionInfo"
                                                             :url           "some-url"
                                                             :is-error      true})
