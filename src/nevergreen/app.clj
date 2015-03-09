(ns nevergreen.app
  (import org.joda.time.DateTime
          org.eclipse.jetty.server.handler.GzipHandler
          org.eclipse.jetty.server.handler.HandlerCollection)
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [ring.adapter.jetty :as jetty]
            [cheshire.core :refer [generate-string]]
            [cheshire.generate :as cheshire]
            [environ.core :refer [env]]
            [nevergreen.api :refer :all]
            [nevergreen.config :refer :all]
            [compojure.core :refer :all]
            [com.duelinmarkers.ring-request-logging :refer [wrap-request-logging]]
            [ring.middleware.json :refer [wrap-json-body]]
            [nevergreen.wrap-cache-control-middleware :refer [wrap-cache-control]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]])
  (:gen-class))

(cheshire/add-encoder DateTime (fn [date json-generator]
                                 (.writeString json-generator (.toString date))))

(defn- as-json-response [body]
  {:content-type "application/json"
   :body         (generate-string body)
   :headers      {"Access-Control-Allow-Origin" "*"}})

(defroutes main-routes
           (GET "/" [] (clojure.java.io/resource "public/index.html"))
           (GET "/config" [] (clojure.java.io/resource "public/config.html"))
           (POST "/api/encrypt" {params :params} (as-json-response (encrypt-password (:password params))))
           (GET "/api/projects" {params :params} (as-json-response (get-all-projects params)))
           (POST "/api/projects" {params :params} (as-json-response (get-interesting-projects params)))
           (route/resources "/")
           (route/not-found "Nothing to see here"))

(def app
  (-> main-routes
      wrap-exceptions
      wrap-request-logging
      wrap-cache-control
      handler/site))

(defn- gzip-configurator [server]
  (let [handler (.getHandler server)]
    (.setHandler server
                 (doto (new HandlerCollection)
                   (.addHandler (doto (new GzipHandler)
                                  (.setHandler handler)
                                  (.setMimeTypes "text/html,text/css,text/javascript,image/svg+xml,text/plain,application/json")))))))

(defn -main []
  (jetty/run-jetty app {:configurator gzip-configurator :port (port) :join? false}))
