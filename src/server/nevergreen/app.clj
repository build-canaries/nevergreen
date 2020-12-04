(ns nevergreen.app
  (:import (com.fasterxml.jackson.core JsonGenerator)
           (java.time Instant)
           (java.time.format DateTimeFormatter))
  (:require [compojure.core :refer :all]
            [ring.adapter.jetty :refer [run-jetty]]
            [cheshire.generate :as cheshire]
            [nevergreen.config :as config]
            [nevergreen.api-routes :refer :all]
            [nevergreen.app-routes :refer :all]
            [nevergreen.logging :refer [configure-logging]])
  (:gen-class))

(cheshire/add-encoder Instant (fn [^Instant date ^JsonGenerator json-generator]
                                (.writeString json-generator (.format DateTimeFormatter/ISO_INSTANT date))))

(def ^:private all-routes
  (routes
    (-> api-routes
        (wrap-routes wrap-api-middleware))
    (-> app-routes
        (wrap-routes wrap-app-middleware))))

(defn -main []
  (configure-logging)
  (run-jetty all-routes {:host (config/ip) :port (config/port)}))
