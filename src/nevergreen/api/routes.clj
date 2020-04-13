(ns nevergreen.api.routes
  (:require [compojure.core :refer :all]
            [nevergreen.api.projects :as projects]
            [nevergreen.api.security :as security]
            [nevergreen.api.export :refer [export-config]]
            [nevergreen.api.import :refer [import-config]]
            [nevergreen.api.version :refer [version]]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [nevergreen.wrap-cache-control :refer [wrap-no-cache]]
            [nevergreen.wrap-convert-keys :refer [wrap-convert-keys-req wrap-convert-keys-res]]
            [nevergreen.wrap-cors-headers :refer [wrap-cors-headers]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [nevergreen.errors :refer [error-response]]
            [ring-curl.middleware :refer [wrap-curl-logging]]
            [ring.middleware.gzip :refer :all]))

(def ^:private invalid-json (error-response 400 "Malformed JSON in request body" ""))
(def ^:private preflight-response {:status 200})

(defroutes api-routes
           (context "/api" []
             (OPTIONS "/projects" [] preflight-response)
             (POST "/projects" {data :body} {:body (projects/get-projects data)})

             (OPTIONS "/encrypt" [] preflight-response)
             (POST "/encrypt" {data :body} {:headers {"Content-Type" "text/plain; charset=utf-8"}
                                            :body    (security/encrypt-data (slurp data))})

             (OPTIONS "/export" [] preflight-response)
             (POST "/export" {data :body} {:body (export-config data)})

             (OPTIONS "/import" [] preflight-response)
             (POST "/import" {data :body} {:body (import-config data)})

             (GET "/ping" [] {:status 204})

             (GET "/version" [] {:headers {"Content-Type" "text/plain; charset=utf-8"}
                                 :body    (version)})

             ; this stops the index.html getting served for unknown API routes
             (GET "*" [] {:status 404})))

(defn wrap-api-middleware [routes]
  (-> routes
      wrap-convert-keys-req
      (wrap-curl-logging {:level :debug})
      (wrap-json-body {:keywords? true :malformed-response invalid-json})
      wrap-no-cache
      wrap-cors-headers
      wrap-exceptions
      wrap-convert-keys-res
      (wrap-json-response {:pretty true})
      wrap-gzip))
