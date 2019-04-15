(ns nevergreen.config-test
  (:require [clojure.test :refer :all]
            [nevergreen.config :as subject]))

(deftest port
  (testing "from env"
    (binding [subject/env (constantly "1337")]
      (is (= 1337 (subject/port)))))

  (testing "defaults to 5000"
    (binding [subject/env (constantly nil)]
      (is (= 5000 (subject/port))))))

(deftest allow-iframe-from
  (testing "from env"
    (binding [subject/env (constantly "host:port")]
      (is (= "host:port" (subject/allow-iframe-from)))))

  (testing "defaults to 'self'"
    (binding [subject/env (constantly "'self'")]
      (is (= "'self'" (subject/allow-iframe-from))))))

(deftest aes-encryption-key
  (testing "from env"
    (binding [subject/env (constantly "key-thats-valid!")]
      (is (= "key-thats-valid!" (subject/aes-key)))))

  (testing "uses the default if no key is set in the environment"
    (binding [subject/env (constantly nil)]
      (is (= subject/default-aes-key (subject/aes-key)))))

  (testing "throws an exception if an invalid key is provided"
    (binding [subject/env (constantly "not-long-enough")]
      (is (thrown? IllegalArgumentException (subject/aes-key))))))

(deftest ip
  (testing "from env"
    (binding [subject/env (constantly "localhost")]
      (is (= "localhost" (subject/ip)))))

  (testing "defaults to 0.0.0.0"
    (binding [subject/env (constantly nil)]
      (is (= "0.0.0.0" (subject/ip))))))
