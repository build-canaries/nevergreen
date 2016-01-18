(ns nevergreen.admin.routes
  (:require [compojure.core :refer :all]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [nevergreen.wrap-cache-control :refer [wrap-cache-control]]
            [nevergreen.wrap-convert-keys :refer [wrap-convert-keys]]
            [nevergreen.wrap-cors-headers :refer [wrap-cors-headers]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [nevergreen.wrap-redact-sensitive :refer [wrap-redact-sensitive wrap-restore-sensitive]]
            [ring-curl.middleware :refer [wrap-curl-logging]]
            [ring.middleware.gzip :refer :all]
            [ring.middleware.basic-authentication :refer [wrap-basic-authentication]]
            [nevergreen.api.server-side-events :as sse]
            [nevergreen.config :as config]))

(defn authenticated? [name pass]
  (and (= name (config/admin-username))
       (= pass (config/admin-password))))

(def admin-routes
  (routes
    (POST "/admin/push-msg" {body :body} (sse/push-msg (:data body)))))

(defn- wrap-logging [handler]
  (-> handler
      wrap-restore-sensitive
      (wrap-curl-logging {:level :info})
      wrap-redact-sensitive))

(defn wrap-admin-middleware [routes]
  (-> routes
      (wrap-basic-authentication authenticated?)
      wrap-convert-keys
      wrap-logging
      (wrap-json-body {:keywords? true})
      (wrap-json-response {:pretty true})
      wrap-cache-control
      wrap-cors-headers
      wrap-exceptions
      wrap-gzip))
