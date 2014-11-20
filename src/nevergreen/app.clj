(ns nevergreen.app
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [ring.adapter.jetty :as jetty]
            [nevergreen.parser :as parser]
            [nevergreen.reducer :as reducer]
            [cheshire.core :refer [generate-string]]
            [environ.core :refer [env]]
            [nevergreen.config :refer :all]
            [compojure.core :refer :all])
  (:gen-class))

(defn- as-json-response [body]
  {:content-type "application/json"
   :body         (generate-string body)})

(defn get-json-projects [url]
  (-> (parser/get-projects url)
      (reducer/aggregate)
      (as-json-response)))

(defn get-interesting-projects [request]
  (->> (parser/get-interesting-projects request)
       (reducer/show-selected-projects request)
       (as-json-response)))

(defroutes main-routes
           (GET "/" [] (clojure.java.io/resource "public/index.html"))
           (GET "/api/projects" {params :params} (get-json-projects (:url params)))
           (GET "/all" [] (get-json-projects (cctray-url)))
           (POST "/interesting" request (get-interesting-projects (:params request)))
           (route/resources "/"))

(def app
  (handler/site main-routes))


(defn -main []
  (jetty/run-jetty app {:port (port) :join? false}))