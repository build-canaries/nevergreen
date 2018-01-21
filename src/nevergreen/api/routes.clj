(ns nevergreen.api.routes
  (:require [compojure.core :refer :all]
            [nevergreen.api.projects :as projects]
            [nevergreen.api.security :as security]
            [nevergreen.api.version :refer [version]]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [nevergreen.wrap-cache-control :refer [wrap-no-cache]]
            [nevergreen.wrap-convert-keys :refer [wrap-convert-keys]]
            [nevergreen.wrap-cors-headers :refer [wrap-cors-headers]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [nevergreen.wrap-redact-sensitive :refer [wrap-redact-sensitive wrap-restore-sensitive]]
            [nevergreen.errors :refer [error-response]]
            [ring-curl.middleware :refer [wrap-curl-logging]]
            [ring.middleware.gzip :refer :all]))

(def ^:private invalid-json (error-response 400 "Malformed JSON in request body" ""))
(def ^:private preflight-response {:status 200})

(def api-routes
  (routes
    (OPTIONS "/api/projects/all" [] preflight-response)
    (POST "/api/projects/all" {body :body} {:body (projects/get-all body)})

    (OPTIONS "/api/projects/interesting" [] preflight-response)
    (POST "/api/projects/interesting" {body :body} {:body (projects/get-interesting body)})

    (OPTIONS "/api/encrypt" [] preflight-response)
    (POST "/api/encrypt" {body :body} {:body (security/encrypt-password body)})

    (GET "/api/ping" [] {:status 204})

    (GET "/api/version" [] {:headers {"Content-Type" "text/plain"} :body (version)})))

(defn- wrap-logging [handler]
  (-> handler
      wrap-restore-sensitive
      (wrap-curl-logging {:level :info})
      wrap-redact-sensitive))

(defn wrap-api-middleware [routes]
  (-> routes
      wrap-convert-keys
      wrap-logging
      (wrap-json-body {:keywords? true :malformed-response invalid-json})
      (wrap-json-response {:pretty true})
      wrap-no-cache
      wrap-cors-headers
      wrap-exceptions
      wrap-gzip))
