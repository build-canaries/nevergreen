(ns nevergreen.crypto-test
  (:require [midje.sweet :refer :all]
            [nevergreen.crypto :as subject]
            [nevergreen.config :as config]))

(fact "encrypts and decrypts a string"
      (subject/decrypt (subject/encrypt "some-text")) => "some-text"
      (provided
        (config/aes-key) => "abcdefghijklmnop"))

(fact "just returns nil if trying to decrypt nil"
      (subject/decrypt nil) => nil)

(fact "just returns nil if trying to decrypt an empty string"
      (subject/decrypt "") => nil)

(fact "throws a more sensible error caused by changing the AES_KEY"
      (subject/decrypt (subject/encrypt "some-text")) => (throws "Unable to decrypt password as the Nevergreen server's AES_KEY has changed")
      (provided
        (config/aes-key)  =streams=> ["aaaaaaaaaaaaaaaa" "bbbbbbbbbbbbbbbb"]))
