(ns nevergreen.api-routes
  (:require [compojure.core :refer :all]
            [nevergreen.api.version :refer [version]]
            [nevergreen.api.security :as security]
            [nevergreen.backup.export :refer [export-config]]
            [nevergreen.backup.import :refer [import-config]]
            [nevergreen.projects.projects :as projects]
            [nevergreen.projects.preview :as preview]
            [nevergreen.projects.ci-gateway :refer [test-connection]]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [nevergreen.middleware.wrap-cache-control :refer [wrap-no-cache]]
            [nevergreen.middleware.wrap-convert-keys :refer [wrap-convert-keys-req wrap-convert-keys-res]]
            [nevergreen.middleware.wrap-cors-headers :refer [wrap-cors-headers]]
            [nevergreen.middleware.wrap-exceptions :refer [wrap-exceptions]]
            [nevergreen.errors :refer [error-response]]
            [ring-curl.middleware :refer [wrap-curl-logging]]
            [ring.middleware.gzip :refer [wrap-gzip]]))

(def ^:private invalid-json (error-response 400 "Malformed JSON in request body" ""))
(def ^:private preflight-response {:status 200})

(defroutes api-routes
           (context "/api" []
             (OPTIONS "/projects" [] preflight-response)
             (POST "/projects" {data :body} {:body (projects/get-projects data)})

             (OPTIONS "/preview" [] preflight-response)
             (POST "/preview" {data :body} {:body (preview/preview data)})

             (OPTIONS "/encrypt" [] preflight-response)
             (POST "/encrypt" {data :body} {:headers {"Content-Type" "text/plain; charset=utf-8"}
                                            :body    (security/encrypt-data (slurp data))})

             (OPTIONS "/export" [] preflight-response)
             (POST "/export" {data :body} {:body (export-config data)})

             (OPTIONS "/import" [] preflight-response)
             (POST "/import" {data :body} {:body (import-config data)})

             (OPTIONS "/test-connection" [] preflight-response)
             (POST "/test-connection" {data :body} (do (test-connection data)
                                                       {:status 204}))

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
