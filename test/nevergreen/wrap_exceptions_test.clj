(ns nevergreen.wrap-exceptions-test
  (:require [clojure.test :refer :all]
            [nevergreen.wrap-exceptions :as subject]
            [nevergreen.errors :refer [error-response]]))

(deftest wrap-exceptions
  (testing "exceptions should be get a 500 status and a generic message"
    (let [app (fn [_] (throw (Exception. "message")))
          req {:uri "some-url"}
          res ((subject/wrap-exceptions app) req)]
      (is (= (error-response 500 "An unhandled exception was thrown" "some-url") res)))))
