(ns nevergreen.app.routes
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [nevergreen.wrap-cache-control :refer [wrap-cache-control]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [ring.middleware.defaults :refer :all]))

(def app-routes
  (routes
    (GET "/" [] (clojure.java.io/resource "public/index.html"))
    (route/resources "/")
    (route/not-found "Nothing to see here")))

(defn wrap-app-middleware [routes]
  (-> (wrap-defaults routes (assoc site-defaults
                              :session false))
      wrap-cache-control
      wrap-exceptions))
