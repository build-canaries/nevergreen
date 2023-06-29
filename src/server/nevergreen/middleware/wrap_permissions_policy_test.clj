(ns nevergreen.middleware.wrap-permissions-policy-test
  (:require [clojure.test :refer :all]
            [clojure.string :as s]
            [nevergreen.middleware.wrap-permissions-policy :as subject]))

(deftest wrap-feature-policy

  (testing "allows autoplay so broken build sounds can be triggered automatically"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-permissions-policy app) req)]
      (is (s/includes? (get (:headers res) "Permissions-Policy") "autoplay=(self)"))))

  (testing "allows fullscreen"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-permissions-policy app) req)]
      (is (s/includes? (get (:headers res) "Permissions-Policy") "fullscreen=(self)")))))
