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
             (subject/port) => 5000
             (provided
               (env :port) => nil)))

(fact "allow iframe from"
      (fact "from env"
            (subject/allow-iframe-from) => "host:port"
            (provided
              (env :allow-iframe-from) => "host:port"))

      (fact "defaults to 'self'"
            (subject/allow-iframe-from) => "'self'"))

(facts "aes encryption key"
       (fact "from env"
             (subject/aes-key) => "key-thats-valid!"
             (provided
               (env :aes-key) => "key-thats-valid!"))

       (fact "uses the default if no key is set in the environment"
             (subject/aes-key) => subject/default-aes-key
             (provided
               (env :aes-key) => nil))

       (fact "throws an exception if an invalid key is provided"
             (subject/aes-key) => (throws RuntimeException)
             (provided
               (env :aes-key) => "not-long-enough")))

(facts "ip"
       (fact "from env"
             (subject/ip) => "localhost"
             (provided
               (env :ip) => "localhost"))

       (fact "defaults to 0.0.0.0"
             (subject/ip) => "0.0.0.0"
             (provided
               (env :ip) => nil)))
