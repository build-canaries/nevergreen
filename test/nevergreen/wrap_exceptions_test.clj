(ns nevergreen.wrap-exceptions-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-exceptions :as subject]
            [nevergreen.errors :refer [error-response]]))

(fact "exceptions should be get a 500 status and a generic message"
      ((subject/wrap-exceptions (fn [_]
                                  (throw (Exception. "message")))) {}) => irrelevant
      (provided
        (error-response 500 "An unhandled exception was thrown") => {}))
