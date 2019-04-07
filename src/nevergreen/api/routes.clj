(ns nevergreen.api.routes
  (:require [compojure.core :refer :all]
            [nevergreen.api.projects :as projects]
            [nevergreen.api.security :as security]
            [nevergreen.api.export :refer [export-config]]
            [nevergreen.api.import :refer [import-config]]
            [nevergreen.api.version :refer [version]]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [nevergreen.wrap-cache-control :refer [wrap-no-cache]]
            [nevergreen.wrap-convert-keys :refer [wrap-convert-keys]]
            [nevergreen.wrap-cors-headers :refer [wrap-cors-headers]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [nevergreen.errors :refer [error-response]]
            [ring-curl.middleware :refer [wrap-curl-logging]]
            [ring.middleware.gzip :refer :all]))

(def ^:private invalid-json (error-response 400 "Malformed JSON in request body" ""))
(def ^:private preflight-response {:status 200})

(defroutes api-routes
           (context "/api" []
             (OPTIONS "/projects/all" [] preflight-response)
             (POST "/projects/all" {data :body} {:body (projects/get-all data)})

             (OPTIONS "/projects/interesting" [] preflight-response)
             (POST "/projects/interesting" {data :body} {:body (projects/get-interesting data)})

             (OPTIONS "/encrypt" [] preflight-response)
             (POST "/encrypt" {data :body} {:body (security/encrypt-password data)})

             (OPTIONS "/export" [] preflight-response)
             (POST "/export" {data :body} {:body (export-config data)})

             (OPTIONS "/import" [] preflight-response)
             (POST "/import" {data :body} {:body (import-config data)})

             (GET "/ping" [] {:status 204})

             (GET "/version" [] {:headers {"Content-Type" "text/plain"} :body (version)})))

(defn wrap-api-middleware [routes]
  (-> routes
      wrap-convert-keys
      (wrap-curl-logging {:level :debug})
      (wrap-json-body {:keywords? true :malformed-response invalid-json})
      (wrap-json-response {:pretty true})
      wrap-no-cache
      wrap-cors-headers
      wrap-exceptions
      wrap-gzip))
