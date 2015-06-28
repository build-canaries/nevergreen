(ns nevergreen.app.routes-test
  (:require [nevergreen.app.routes :as subject]
            [midje.sweet :refer :all]
            [ring.mock.request :as mock]))

(fact "redirect to the latest release on github"
      (subject/app-routes (mock/request :get "/latest"))
      => (contains {:status  302
                    :headers (contains {"Location" #"https://github.com/build-canaries/nevergreen/releases/download/.*/nevergreen-standalone.jar"})}))
