(ns nevergreen.app
  (:import org.joda.time.DateTime
           org.slf4j.bridge.SLF4JBridgeHandler)
  (:require [compojure.core :refer :all]
            [ring.adapter.jetty :refer [run-jetty]]
            [cheshire.generate :as cheshire]
            [nevergreen.config :as config]
            [nevergreen.api.routes :refer :all]
            [nevergreen.app.routes :refer :all])
  (:gen-class))

(SLF4JBridgeHandler/removeHandlersForRootLogger)
(SLF4JBridgeHandler/install)

(cheshire/add-encoder DateTime (fn [date json-generator]
                                 (.writeString json-generator (.toString date))))

(def ^:private all-routes
  (routes
    (-> api-routes
        (wrap-routes wrap-api-middleware))
    (-> app-routes
        (wrap-routes wrap-app-middleware))))

(defn -main []
  (run-jetty all-routes {:host (config/ip) :port (config/port)}))
