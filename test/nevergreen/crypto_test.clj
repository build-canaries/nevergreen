(ns nevergreen.crypto-test
  (:require [midje.sweet :refer :all]
            [nevergreen.crypto :as subject]
            [nevergreen.config :as config]))

(fact "encrypts and decrypts a string"
      (subject/decrypt (subject/encrypt "some-text")) => "some-text"

      (provided
        (config/aes-key) => "abcdefghijklmnop"))
