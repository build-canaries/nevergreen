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

(facts "salt"
       (fact "from env"
             (subject/salt) => "a-salt"
             (provided
               (env :salt) => "a-salt")))
