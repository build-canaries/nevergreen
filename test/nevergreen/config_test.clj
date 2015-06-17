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

       (fact "uses the default if no key is set in the environment"
             (subject/aes-key) => subject/default-aes-key
             (provided
               (env :aes_key) => nil))

       (fact "throws an exception if an invalid key is provided"
             (subject/aes-key) => (throws RuntimeException)
             (provided
               (env :aes_key) => "not-long-enough")))
