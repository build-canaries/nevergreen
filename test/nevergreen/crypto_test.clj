(ns nevergreen.crypto-test
  (:require [clojure.test :refer :all]
            [nevergreen.crypto :as subject]))

(def aes-key "abcdefghijklmnop")

(deftest encrypt-decrypt

  (testing "encrypts and decrypts a string"
    (is (= "some-text" (subject/decrypt (subject/encrypt "some-text" aes-key) aes-key))))

  (testing "just returns nil if trying to decrypt nil"
    (is (nil? (subject/decrypt nil aes-key))))

  (testing "just returns nil if trying to decrypt an empty string"
    (is (nil? (subject/decrypt "" aes-key))))

  (testing "throws a more sensible error caused by changing the AES_KEY"
    (let [original-aes-key "aaaaaaaaaaaaaaaa"
          new-aes-key "bbbbbbbbbbbbbbbb"
          encrypted-value (subject/encrypt "some-text" original-aes-key)]
      (is (thrown-with-msg? Exception
                            #"Unable to decrypt password as the Nevergreen server's AES_KEY has changed"
                            (subject/decrypt encrypted-value new-aes-key))))))
