(ns nevergreen.app.routes
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [nevergreen.wrap-cache-control :refer [wrap-cache-control]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]))

(def app-routes
  (routes
    (GET "/" [] (clojure.java.io/resource "public/index.html"))
    (route/resources "/")
    (route/not-found "Nothing to see here")))

(defn wrap-app-middleware [routes]
  (-> routes
      wrap-cache-control
      wrap-exceptions))
