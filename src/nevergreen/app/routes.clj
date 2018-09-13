(ns nevergreen.app.routes
  (:require [compojure.core :refer :all]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [nevergreen.wrap-cache-control :refer [wrap-cache-control]]
            [nevergreen.wrap-content-security-policy :refer [wrap-content-security-policy]]
            [nevergreen.wrap-feature_policy :refer [wrap-feature-policy]]
            [nevergreen.wrap-referrer-policy :refer [wrap-referrer-policy]]
            [ring.middleware.defaults :refer :all]
            [ring.util.response :refer :all]
            [ring.middleware.gzip :refer :all]))

(def app-routes
  (routes
    (GET "*" [] (clojure.java.io/resource "public/index.html"))))

(defn wrap-app-middleware [routes]
  (-> (wrap-defaults routes (assoc site-defaults :session false))
      wrap-cache-control
      wrap-content-security-policy
      wrap-feature-policy
      wrap-referrer-policy
      wrap-exceptions
      wrap-gzip))
