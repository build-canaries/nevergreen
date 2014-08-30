(ns build-monitor-clj.app
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [ring.adapter.jetty :as jetty]
            [build-monitor-clj.parser :as parser]
            [cheshire.core :refer [generate-string]]
            [compojure.core :refer :all]))

(defroutes main-routes
           (GET "/" [] (clojure.java.io/resource "public/index.html"))
           (GET "/projects" [] (generate-string {:content-type "application/json"
                                                 :body         (parser/get-projects "resources/test_data.xml")}))
           (route/resources "/"))

(def app
  (handler/site main-routes))

(defn -main [& _]
  (jetty/run-jetty app {:port 9090 :join? false}))