(ns nevergreen.app
  (import org.joda.time.DateTime)
  (:require [compojure.core :refer :all]
            [org.httpkit.server :as http-kit]
            [cheshire.generate :as cheshire]
            [nevergreen.config :as config]
            [nevergreen.api.routes :refer :all]
            [nevergreen.app.routes :refer :all])
  (:gen-class))

(cheshire/add-encoder DateTime (fn [date json-generator]
                                 (.writeString json-generator (.toString date))))

(def ^:private all-routes
  (routes
    (-> api-routes
        (wrap-routes wrap-api-middleware))
    (-> app-routes
        (wrap-routes wrap-app-middleware))))

(defn -main []
  (http-kit/run-server all-routes {:port (config/port)}))
