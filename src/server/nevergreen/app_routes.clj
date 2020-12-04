(ns nevergreen.app-routes
  (:require [compojure.core :refer :all]
            [nevergreen.middleware.wrap-exceptions :refer [wrap-exceptions]]
            [nevergreen.middleware.wrap-cache-control :refer [wrap-cache-control]]
            [nevergreen.middleware.wrap-content-security-policy :refer [wrap-content-security-policy]]
            [nevergreen.middleware.wrap-feature_policy :refer [wrap-feature-policy]]
            [nevergreen.middleware.wrap-referrer-policy :refer [wrap-referrer-policy]]
            [ring.middleware.defaults :refer :all]
            [ring.util.response :refer :all]
            [ring.middleware.gzip :refer :all]))

(defroutes app-routes
           (GET "*" [] (clojure.java.io/resource "public/index.html")))

(defn wrap-app-middleware [routes]
  (-> (wrap-defaults routes (assoc site-defaults :session false))
      wrap-cache-control
      wrap-content-security-policy
      wrap-feature-policy
      wrap-referrer-policy
      wrap-exceptions
      wrap-gzip))
