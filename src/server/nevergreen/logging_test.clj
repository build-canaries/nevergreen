(ns nevergreen.logging-test
  (:require [clojure.test :refer :all]
            [nevergreen.logging :as subject]))

(deftest redact-url
  (testing "returns the same string if nothing needs redacting"
    (is (subject/redact-url "http://some-url") "http://some-url"))

  (testing "returns the same string if it is not a valid URL"
    (is (subject/redact-url "invalid-url") "invalid-url"))

  (testing "redacts usernames"
    (is (subject/redact-url "http://username@some-url") "http://REDACTED@some-url"))

  (testing "redacts passwords"
    (is (subject/redact-url "http://:password@some-url") "http://:REDACTED@some-url"))

  (testing "redacts usernames and passwords"
    (is (subject/redact-url "http://username:password@some-url") "http://REDACTED:REDACTED@some-url"))

  (testing "redacts query params as they may include API tokens"
    (is (subject/redact-url "http://some-url?api=token") "http://some-url?api=REDACTED"))

  (testing "redacts all the things"
    (is (subject/redact-url "http://username:password@some-url?api=token") "http://REDACTED:REDACTED@some-url?api=REDACTED")))
