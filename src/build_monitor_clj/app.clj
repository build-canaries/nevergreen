(ns build-monitor-clj.app
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [ring.adapter.jetty :as jetty]
            [compojure.response :as response]
            [build-monitor-clj.parser :as parser]
            [compojure.core :refer :all]))

(defroutes main-routes
           (GET "/" [] (parser/get-projects "resources/test_data.xml")))

(def app (handler/site main-routes))

(defn -main [& args] (jetty/run-jetty app {:port 9090 :join? false}))
