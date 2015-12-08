(ns nevergreen.api.routes
  (:require [compojure.core :refer :all]
            [nevergreen.api.projects :as projects]
            [nevergreen.api.security :as security]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [nevergreen.wrap-cache-control :refer [wrap-cache-control]]
            [nevergreen.wrap-convert-keys :refer [wrap-convert-keys]]
            [nevergreen.wrap-cors-headers :refer [wrap-cors-headers]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [nevergreen.wrap-redact-sensitive :refer [wrap-redact-sensitive wrap-restore-sensitive]]
            [ring-curl.middleware :refer [wrap-curl-logging]]
            [ring.middleware.gzip :refer :all]))

(def ^:private preflight-response {:status 200})

(def api-routes
  (routes
    (OPTIONS "/api/projects/all" [] preflight-response)
    (POST "/api/projects/all" {body :body} {:body (projects/get-all body)})

    (OPTIONS "/api/projects/interesting" [] preflight-response)
    (POST "/api/projects/interesting" {body :body} {:body (projects/get-interesting body)})

    (OPTIONS "/api/encrypt" [] preflight-response)
    (POST "/api/encrypt" {body :body} {:body (security/encrypt-password body)})))

(defn- wrap-logging [handler]
  (-> handler
      wrap-restore-sensitive
      (wrap-curl-logging {:level :info})
      wrap-redact-sensitive))

(defn wrap-api-middleware [routes]
  (-> routes
      wrap-convert-keys
      wrap-logging
      (wrap-json-body {:keywords? true})
      (wrap-json-response {:pretty true})
      wrap-cache-control
      wrap-cors-headers
      wrap-exceptions
      wrap-gzip))
