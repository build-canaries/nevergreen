(ns nevergreen.api.routes
  (:require [compojure.core :refer :all]
            [nevergreen.api.projects :as projects]
            [nevergreen.api.security :as security]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [nevergreen.wrap-cache-control :refer [wrap-cache-control]]
            [nevergreen.wrap-cors-headers :refer [wrap-cors-headers]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [ring-curl.middleware :refer [log-as-curl]]))

(def api-routes
  (routes
    (POST "/api/projects/all" {body :body} {:body (projects/get-all body)})
    (POST "/api/projects/interesting" {body :body} {:body (projects/get-interesting body)})
    (POST "/api/encrypt" {body :body} {:body (security/encrypt-password body)})))

(defn wrap-api-middleware [routes]
  (-> routes
      (log-as-curl :level :info)
      (wrap-json-body {:keywords? true})
      (wrap-json-response {:pretty true})
      wrap-cache-control
      wrap-cors-headers
      wrap-exceptions))
