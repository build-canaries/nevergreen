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
            [ring.middleware.json :refer [wrap-json-body]]
            [nevergreen.wrap-cache-control :refer [wrap-cache-control]]
            [nevergreen.wrap-cors-headers :refer [wrap-cors-headers]]
            [nevergreen.wrap-exceptions :refer [wrap-exceptions]]
            [nevergreen.api.routes :refer [api-routes]]
            [ring-curl.middleware :refer [log-as-curl]])
  (:gen-class))

(cheshire/add-encoder DateTime (fn [date json-generator]
                                 (.writeString json-generator (.toString date))))

(defn- as-json-response [body]
  {:content-type "application/json"
   :body         (generate-string body)})

(defroutes main-routes
           (GET "/" [] (clojure.java.io/resource "public/index.html"))
           (POST "/api/encrypt" {params :params} (as-json-response (encrypt-password (:password params))))
           (GET "/api/projects" {params :params} (merge-with merge
                                                             {:headers {"Warning" "Deprecated as of 0.6.0, use POST /api/projects/all instead"}}
                                                             (as-json-response (get-all-projects params))))
           (POST "/api/projects" {body :body} (merge-with merge
                                                          {:headers {"Warning" "Deprecated as of 0.6.0, use POST /api/projects/interesting instead"}}
                                                          (as-json-response (get-interesting-projects body))))
           (route/resources "/")
           (route/not-found "Nothing to see here"))

(def all-routes
  (routes api-routes main-routes))

(def app
  (-> all-routes
      (log-as-curl :level :info)
      wrap-exceptions
      wrap-cache-control
      wrap-cors-headers
      (wrap-json-body {:keywords? true})
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
