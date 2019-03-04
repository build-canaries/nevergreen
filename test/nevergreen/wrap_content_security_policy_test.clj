(ns nevergreen.wrap-content-security-policy-test
  (:require [clojure.test :refer :all]
            [clojure.string :as s]
            [nevergreen.wrap-content-security-policy :as subject]))

(deftest wrap-content-security-policy

  (testing "removes the X-Frame-Options to avoid browsers using this over the value in the Content-Security-Policy"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-content-security-policy app) req)]
      (is (nil? (get (:headers res) "X-Frame-Options")))))

  (testing "allows unsafe-inline in style-src as the Monitor page dynamically calculates and sets dimensions using the style attribute"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-content-security-policy app) req)]
      (is (s/includes? (get (:headers res) "Content-Security-Policy") "style-src 'self' 'unsafe-inline'"))))

  (testing "allows images from anywhere so any success image can be used and from data as small files get encoded by the webpack build"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-content-security-policy app) req)]
      (is (s/includes? (get (:headers res) "Content-Security-Policy") "img-src * data:"))))

  (testing "allows fonts from data as small files get encoded by the webpack build"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-content-security-policy app) req)]
      (is (s/includes? (get (:headers res) "Content-Security-Policy") "font-src 'self' data:"))))

  (testing "allows media from anywhere so any broken build sound can be used"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-content-security-policy app) req)]
      (is (s/includes? (get (:headers res) "Content-Security-Policy") "media-src *")))))
