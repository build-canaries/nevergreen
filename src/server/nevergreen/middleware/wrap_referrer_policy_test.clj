(ns nevergreen.middleware.wrap-referrer-policy-test
  (:require [clojure.test :refer :all]
            [nevergreen.middleware.wrap-referrer-policy :as subject]))

(deftest wrap-referrer-policy

  ; https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  (testing "sets strict-origin-when-cross-origin as this seems like the best option"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-referrer-policy app) req)]
      (is (= (get (:headers res) "Referrer-Policy") "strict-origin-when-cross-origin")))))
