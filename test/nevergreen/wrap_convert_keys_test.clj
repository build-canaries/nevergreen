(ns nevergreen.wrap-convert-keys-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-convert-keys :as subject]))

(facts "wrap convert keys"
       (fact "converts responses from kebab-case to camelCase"
             ((subject/wrap-convert-keys ..app..) ..req..) => {:someKey "some-value"}
       (provided
         (..app.. ..req..) => {:some-key "some-value"})))
