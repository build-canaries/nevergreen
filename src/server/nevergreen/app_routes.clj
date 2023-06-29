(ns nevergreen.app-routes
  (:require [compojure.core :refer :all]
            [nevergreen.middleware.wrap-exceptions :refer [wrap-exceptions]]
            [nevergreen.middleware.wrap-cache-control :refer [wrap-cache-control]]
            [nevergreen.middleware.wrap-content-security-policy :refer [wrap-content-security-policy]]
            [nevergreen.middleware.wrap-permissions-policy :refer [wrap-permissions-policy]]
            [nevergreen.middleware.wrap-referrer-policy :refer [wrap-referrer-policy]]
            [ring.middleware.defaults :refer :all]
            [ring.util.response :refer :all]
            [ring.middleware.gzip :refer :all]))

(defroutes app-routes
           ; redirect old deprecated routes
           (GET "/success" [] (redirect "/settings" :moved-permanently))
           (GET "/backup" [] (redirect "/settings" :moved-permanently))

           (GET "*" [] (clojure.java.io/resource "public/index.html")))

(defn wrap-app-middleware [routes]
  (-> (wrap-defaults routes (assoc site-defaults :session false))
      wrap-cache-control
      wrap-content-security-policy
      wrap-permissions-policy
      wrap-referrer-policy
      wrap-exceptions
      wrap-gzip))
