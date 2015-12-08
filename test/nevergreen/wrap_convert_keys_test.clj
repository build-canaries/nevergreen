(ns nevergreen.wrap-convert-keys-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-convert-keys :as subject]))

(facts "wrap convert keys"
       (fact "converts requests from kebab-case to camelCase"
             ((subject/wrap-convert-keys ..handler..) {:body {:someKey "some-value"}}) => irrelevant
             (provided
               (..handler.. {:body {:some-key "some-value"}}) => irrelevant))

       (fact "converts responses from kebab-case to camelCase"
             ((subject/wrap-convert-keys ..handler..) {:body {:some-key "some-value"}}) => {:anotherKey "another-value"}
             (provided
               (..handler.. {:body {:some-key "some-value"}}) => {:another-key "another-value"})))
