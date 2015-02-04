(ns nevergreen.crypto-test
  (:require [midje.sweet :refer :all]
            [nevergreen.crypto :as subject]))

(def aes-key "abcdefghijklmnop")

(fact "encrypts and decrypts a string"
      (subject/decrypt (subject/encrypt "some-text" aes-key) aes-key) => "some-text")
