(ns nevergreen.api.routes
  (:require [compojure.core :refer :all]
            [nevergreen.api.projects :as projects]
            [nevergreen.api.security :as security]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [nevergreen.wrap-cache-control :refer [wrap-cache-control]]
            [nevergreen.wrap-cors-headers :refer [wrap-cors-headers]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [ring-curl.middleware :refer [log-as-curl]]
            [ring.middleware.gzip :refer :all]))

(def ^:private preflight-response {:status 200})

(def api-routes
  (routes
    (OPTIONS "/api/version" [] preflight-response)
    (GET "/api/version" [] {:body "0.7.0-alpha"})

    (OPTIONS "/api/projects/all" [] preflight-response)
    (POST "/api/projects/all" {body :body} {:body (projects/get-all body)})

    (OPTIONS "/api/projects/interesting" [] preflight-response)
    (POST "/api/projects/interesting" {body :body} {:body (projects/get-interesting body)})

    (OPTIONS "/api/encrypt" [] preflight-response)
    (POST "/api/encrypt" {body :body} {:body (security/encrypt-password body)})))

(defn wrap-api-middleware [routes]
  (-> routes
      (log-as-curl :level :info)
      (wrap-json-body {:keywords? true})
      (wrap-json-response {:pretty true})
      wrap-cache-control
      wrap-cors-headers
      wrap-exceptions
      wrap-gzip))
