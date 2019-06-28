(ns nevergreen.wrap-content-security-policy-test
  (:require [clojure.test :refer :all]
            [clojure.string :as s]
            [nevergreen.wrap-content-security-policy :as subject]
            [nevergreen.config :as config]))

(deftest wrap-content-security-policy

  ; X-Frame-Options takes priority, but has a different syntax so if the user has set the frame-ancestors config
  ; we just remove the X-Frame-Options header, otherwise we set it to the default for old browsers who don't
  ; support the Content-Security-Policy header.
  ;
  ; https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Clickjacking_Defense_Cheat_Sheet.md

  (testing "removes the X-Frame-Options if the user wants to use in a frame to avoid browsers using it over the value in the Content-Security-Policy"
    (binding [subject/allow-iframe-from (fn [] "some-updated-value")]
      (let [app (constantly {})
            req {}
            res ((subject/wrap-content-security-policy app) req)]
        (is (nil? (get (:headers res) "X-Frame-Options"))))))

  (testing "sets the X-Frame-Options to the default value if the user doesn't want to use in a frame"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-content-security-policy app) req)]
      (is (= (get (:headers res) "X-Frame-Options") config/default-x-frame-option))))

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
