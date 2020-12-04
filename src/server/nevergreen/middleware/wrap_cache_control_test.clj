(ns nevergreen.middleware.wrap-cache-control-test
  (:require [clojure.test :refer :all]
            [nevergreen.middleware.wrap-cache-control :as subject]))

(deftest wrap-no-cache
  (testing "just adds a no cache header"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-no-cache app) req)]
      (is (= {:headers {"Cache-Control" subject/no-cache}} res))))

  (testing "adds to any existing headers"
    (let [app (constantly {:headers {"foo" "bar"}})
          req {}
          res ((subject/wrap-no-cache app) req)]
      (is (= {:headers {"foo"           "bar"
                        "Cache-Control" subject/no-cache}} res)))))

(deftest wrap-cache-control
  ; https://stackoverflow.com/questions/38843970/service-worker-javascript-update-frequency-every-24-hours/38854905#38854905
  (testing "adds no cache to the service worker to avoid 24 hour caching in Chrome"
    (let [app (constantly {})
          req {:uri "/service-worker.js"}
          res ((subject/wrap-cache-control app) req)]
      (is (= subject/no-cache (get (:headers res) "Cache-Control")))))

  (testing "adds a short cache to the index.html to stop users getting an old versions"
    (let [app (constantly {})
          req {:uri "/index.html"}
          res ((subject/wrap-cache-control app) req)]
      (is (= subject/twelve-hour-cache (get (:headers res) "Cache-Control")))))

  (testing "adds a short cache to anything that isn't a file, as it should be a refresh on a client side route e.g. /tracking"
    (let [app (constantly {})
          req {:uri "/"}
          res ((subject/wrap-cache-control app) req)]
      (is (= subject/twelve-hour-cache (get (:headers res) "Cache-Control")))))

  (testing "adds max cache to anything hashed by the webpack build"
    (let [app (constantly {})
          req {:uri "/main.qwerd7n2.js"}
          res ((subject/wrap-cache-control app) req)]
      (is (= subject/max-cache (get (:headers res) "Cache-Control")))))

  (testing "adds a short cache to everything else"
    (let [app (constantly {})
          req {:uri "/irrelevant.js"}
          res ((subject/wrap-cache-control app) req)]
      (is (= subject/twelve-hour-cache (get (:headers res) "Cache-Control"))))))
