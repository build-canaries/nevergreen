(ns nevergreen.app.routes
  (:require [compojure.core :refer :all]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [ring.middleware.defaults :refer :all]
            [ring.middleware.not-modified :refer [wrap-not-modified]]
            [ring.util.response :refer :all]
            [ring.middleware.gzip :refer :all]))

(def app-routes
  (routes
    (GET "*" [] (clojure.java.io/resource "public/index.html"))))

(defn wrap-app-middleware [routes]
  (-> (wrap-defaults routes (assoc site-defaults :session false))
      wrap-not-modified
      wrap-exceptions
      wrap-gzip))
