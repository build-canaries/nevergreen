(ns nevergreen.app
  (import org.joda.time.DateTime)
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [ring.adapter.jetty :as jetty]
            [cheshire.core :refer [generate-string]]
            [cheshire.generate :as cheshire]
            [environ.core :refer [env]]
            [nevergreen.api :refer :all]
            [nevergreen.config :refer :all]
            [compojure.core :refer :all])
  (:gen-class))

(cheshire/add-encoder DateTime (fn [date json-generator]
                                 (.writeString json-generator (.toString date))))

(defn- as-json-response [body]
  {:content-type "application/json"
   :body         (generate-string body)
   :headers {"Access-Control-Allow-Origin" "*"}})

(defroutes main-routes
           (GET "/" [] (clojure.java.io/resource "public/index.html"))
           (GET "/config" [] (clojure.java.io/resource "public/config.html"))
           (GET "/api/projects" {params :params} (as-json-response (get-all-projects (:url params))))
           (POST "/api/projects" {params :params} (as-json-response (get-interesting-projects params)))
           (route/resources "/"))

(def app
  (handler/site main-routes))

(defn -main []
  (jetty/run-jetty app {:port (port) :join? false}))
