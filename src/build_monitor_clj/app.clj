(ns build-monitor-clj.app
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [ring.adapter.jetty :as jetty]
            [compojure.response :as response]
            [build-monitor-clj.parser :as parser]
            [compojure.core :refer :all]
            [cheshire.core :refer :all]))

(defroutes main-routes
           (GET "/projects" [] (generate-string {:content-type "application/json" :body (parser/get-projects "resources/test_data.xml")}))
           (route/resources "/"))

(def app (handler/site main-routes))

(defn -main [& args] (jetty/run-jetty app {:port 9090 :join? false}))
