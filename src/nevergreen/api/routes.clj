(ns nevergreen.api.routes
  (:require [compojure.core :refer :all]
            [cheshire.core :refer [generate-string]]
            [nevergreen.api.projects :as projects]))

(defn- as-json-response [body]
  {:content-type "application/json"
   :body         (generate-string body)})

(def api-routes
  (routes
    (POST "/api/projects/all" {body :body} (as-json-response (projects/get-all body)))
    (POST "/api/projects/interesting" {body :body} (as-json-response (projects/get-interesting body)))))
