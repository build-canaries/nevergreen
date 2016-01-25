(ns nevergreen.app.routes
  (:require [compojure.core :refer :all]
            [nevergreen.wrap-cache-control :refer [wrap-cache-control]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [ring.middleware.defaults :refer :all]
            [ring.util.response :refer :all]
            [ring.middleware.gzip :refer :all]))

(def app-routes
  (routes
    (GET "*" [] (clojure.java.io/resource "public/index.html"))))

(defn wrap-app-middleware [routes]
  (-> (wrap-defaults routes (assoc site-defaults :session false))
      wrap-cache-control
      wrap-exceptions
      wrap-gzip))
