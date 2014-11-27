(ns nevergreen.app
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [ring.adapter.jetty :as jetty]
            [clj-cctray.core :as parser]
            [clj-cctray.filtering :as filtering]
            [cheshire.core :refer [generate-string]]
            [cheshire.generate :as cheshire]
            [environ.core :refer [env]]
            [nevergreen.config :refer :all]
            [compojure.core :refer :all])
  (:gen-class))

(defn- as-json-response [body]
  {:content-type "application/json"
   :body         (generate-string body)})

(defn get-all-projects [url]
  (-> (parser/get-projects url :options [:go :normalise])
      (as-json-response)))

(defn get-interesting-projects [params]
  (->> (parser/get-projects (:cctray params) :options [:go :normalise])
       (filtering/interesting)
       (filtering/by-name (:includedProjects params))
       (as-json-response)))

(defroutes main-routes
           (GET  "/" [] (clojure.java.io/resource "public/index.html"))
           (GET  "/api/projects" {params :params} (get-all-projects (:url params)))
           (POST "/api/projects" {params :params} (get-interesting-projects params))
           (route/resources "/"))

(def app
  (handler/site main-routes))

(defn -main []
  (cheshire/add-encoder org.joda.time.DateTime (fn [date json-generator]
                                                 (.writeString json-generator (.toString date))))
  (jetty/run-jetty app {:port (port) :join? false}))
