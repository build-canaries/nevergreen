(ns nevergreen.wrap-convert-keys-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-convert-keys :as subject]))

(facts "wrap convert keys"
       (fact "converts request bodies from kebab-case to camelCase"
             ((subject/wrap-convert-keys ..handler..) {:header {:header-key irrelevant} :body {:someKey "some-value"}}) => irrelevant
             (provided
               (..handler.. {:header {:header-key irrelevant} :body {:some-key "some-value"}}) => {}))

       (fact "converts response bodies from kebab-case to camelCase"
             ((subject/wrap-convert-keys ..handler..) {:body {:some-key "some-value"}}) => {:headers {:header-key irrelevant} :body {:anotherKey "another-value"}}
             (provided
               (..handler.. {:body {:some-key "some-value"}}) => {:headers {:header-key irrelevant} :body {:another-key "another-value"}})))
