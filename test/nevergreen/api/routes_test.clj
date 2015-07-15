(ns nevergreen.api.routes-test
  (:require [nevergreen.api.routes :as subject]
            [midje.sweet :refer :all]
            [ring.mock.request :as mock]))

(fact "returns the version"
      (subject/api-routes (mock/request :get "/api/version")) => (contains {:body (contains #"\d+\.\d+\.\d+")}))
