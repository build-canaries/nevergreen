(ns build-monitor-clj.app
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [ring.adapter.jetty :as jetty]
            [build-monitor-clj.parser :as parser]
            [build-monitor-clj.reducer :as reducer]
            [cheshire.core :refer [generate-string]]
            [environ.core :refer [env]]
            [build-monitor-clj.config :refer :all]
            [compojure.core :refer :all])
  (:gen-class))

(defn- as-response [body]
  {:content-type "application/json"
   :body         (generate-string body)})

(defroutes main-routes
           (GET "/" [] (clojure.java.io/resource "public/index.html"))
           (GET "/all" [] (-> (parser/get-projects (cctray-url))
                              (reducer/aggregate)
                              (as-response)))
           (GET "/interesting" [] (-> (parser/get-interesting-projects (cctray-url))
                                      (reducer/show-selected-projects)
                                      (as-response)))
           (route/resources "/"))

(def app
  (handler/site main-routes))

(defn -main [& [port]]
  (let [port (Integer. (or port (env :port) 5000))]
    (jetty/run-jetty app {:port port :join? false})))