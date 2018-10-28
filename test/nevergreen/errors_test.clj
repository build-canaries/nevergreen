(ns nevergreen.errors-test
  (:require [midje.sweet :refer :all]
            [nevergreen.errors :as subject]))

(fact "is-error returns true when the given thing is an error"
      (subject/is-error? (subject/create-error "some-text" "some-url")) => true)
