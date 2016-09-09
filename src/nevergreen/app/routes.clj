(ns nevergreen.app.routes
  (:require [compojure.core :refer :all]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [nevergreen.wrap-cache-control :refer [wrap-caching]]
            [nevergreen.wrap-content-security-policy :refer [wrap-content-security-policy]]
            [ring.middleware.defaults :refer :all]
            [ring.util.response :refer :all]
            [ring.middleware.gzip :refer :all]))

(def app-routes
  (routes
    (GET "*" [] (clojure.java.io/resource "public/index.html"))))

(defn wrap-app-middleware [routes]
  (-> (wrap-defaults routes (assoc site-defaults :session false))
      wrap-caching
      wrap-content-security-policy
      wrap-exceptions
      wrap-gzip))
