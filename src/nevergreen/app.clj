(ns nevergreen.app
  (import org.joda.time.DateTime
          org.eclipse.jetty.server.handler.GzipHandler
          org.eclipse.jetty.server.handler.HandlerCollection)
  (:require [compojure.core :refer :all]
            [ring.adapter.jetty :as jetty]
            [cheshire.generate :as cheshire]
            [environ.core :refer [env]]
            [nevergreen.config :refer :all]
            [nevergreen.api.routes :refer :all]
            [nevergreen.app.routes :refer :all])
  (:gen-class))

(cheshire/add-encoder DateTime (fn [date json-generator]
                                 (.writeString json-generator (.toString date))))

(def all-routes
  (routes
    (-> api-routes
        (wrap-routes wrap-api-middleware))
    (-> app-routes
        (wrap-routes wrap-app-middleware))))

(defn- gzip-configurator [server]
  (let [handler (.getHandler server)]
    (.setHandler server
                 (doto (new HandlerCollection)
                   (.addHandler (doto (new GzipHandler)
                                  (.setHandler handler)
                                  (.setMimeTypes "text/html,text/css,text/javascript,image/svg+xml,text/plain,application/json")))))))

(defn -main []
  (jetty/run-jetty all-routes {:configurator gzip-configurator :port (port) :join? false}))
