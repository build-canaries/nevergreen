(ns nevergreen.wrap-cors-headers-test
  (:require [clojure.test :refer :all]
            [nevergreen.wrap-cors-headers :as subject]))

(deftest wrap-cors-headers

  (testing "does not add headers if method is not allowed"
    (let [app (constantly {})
          req {:request-method :put}
          res ((subject/wrap-cors-headers app) req)]
      (is (= {} res))))

  (testing "adds a bunch of CORS headers if the method is allowed"
    (let [expected-cors-headers {"Access-Control-Allow-Methods" "POST, GET, OPTIONS"
                                 "Access-Control-Allow-Origin"  "*"
                                 "Access-Control-Max-Age"       "86400"
                                 "Access-Control-Allow-Headers" "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma"}]

      (testing "POST"
        (let [app (constantly {})
              req {:request-method :post}
              res ((subject/wrap-cors-headers app) req)]
          (is (= {:headers expected-cors-headers} res))))

      (testing "GET"
        (let [app (constantly {})
              req {:request-method :get}
              res ((subject/wrap-cors-headers app) req)]
          (is (= {:headers expected-cors-headers} res))))

      (testing "OPTIONS"
        (let [app (constantly {})
              req {:request-method :options}
              res ((subject/wrap-cors-headers app) req)]
          (is (= {:headers expected-cors-headers} res))))))

  (testing "adds to any existing headers"
    (let [app (constantly {:headers {"foo" "bar"}})
          req {:request-method :get}
          res ((subject/wrap-cors-headers app) req)]
      (is (= {:headers {"foo"                          "bar"
                        "Access-Control-Allow-Methods" "POST, GET, OPTIONS"
                        "Access-Control-Allow-Origin"  "*"
                        "Access-Control-Max-Age"       "86400"
                        "Access-Control-Allow-Headers" "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma"}}
             res)))))
