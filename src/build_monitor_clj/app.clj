(ns build-monitor-clj.app
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [ring.adapter.jetty :as jetty]
            [build-monitor-clj.parser :as parser]
            [cheshire.core :refer [generate-string]]
            [environ.core :refer [env]]
            [compojure.core :refer :all])
  (:gen-class))

(defroutes main-routes
           (GET "/" [] (clojure.java.io/resource "public/index.html"))
           (GET "/projects" [] (generate-string {:content-type "application/json"
                                                 :body         (parser/get-interesting-projects "resources/test_data.xml")}))
           (route/resources "/"))

(def app
  (handler/site main-routes))

(defn -main [& [port]]
  (let [port (Integer. (or port (env :port) 5000))]
    (jetty/run-jetty app {:port port :join? false})))