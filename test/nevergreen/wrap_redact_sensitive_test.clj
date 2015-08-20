(ns nevergreen.wrap-redact-sensitive-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-redact-sensitive :as subject]))

(facts "wrap redact sensitive"
       (fact "redacts the password and adds it to a top level map"
             ((subject/wrap-redact-sensitive ..handler..) {:body {:password "some-password"}}) => irrelevant
             (provided
               (..handler.. {:body {:password subject/redacted} :redacted {:password "some-password"}}) => irrelevant))

       (fact "doesn't add reacted map if nothing was redacted"
             ((subject/wrap-redact-sensitive ..handler..) {}) =not=> (contains {:redacted {}})
             (provided
               (..handler.. {}) => {}))

       (fact "restores a redacted password"
             ((subject/wrap-restore-sensitive ..handler..) {:redacted {:password "some-password"}}) => irrelevant
             (provided
               (..handler.. (contains {:body {:password "some-password"}})) => irrelevant)))
