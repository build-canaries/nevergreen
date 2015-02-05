(ns nevergreen.config-test
  (:require [nevergreen.config :as subject]
            [environ.core :refer [env]]
            [midje.sweet :refer :all]))

(facts "port"
       (fact "from env"
             (subject/port) => 1337
             (provided
               (env :port) => "1337"))

       (fact "defaults to 5000"
             (subject/port) => 5000))

(facts "aes encryption key"
       (fact "from env"
             (subject/aes-key) => "key-thats-valid!"
             (provided
               (env :aes_key) => "key-thats-valid!"))

       (fact "defaults to abcdefghijklmnop"
             (subject/aes-key) => "abcdefghijklmnop"
             (provided
               (env :aes_key) => nil))

       (fact "defaults to abcdefghijklmnop when incorrect key incorrect length"
             (subject/aes-key) => "abcdefghijklmnop"
             (provided
               (env :aes_key) => "a-salt")))
