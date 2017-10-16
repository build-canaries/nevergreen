(ns nevergreen.wrap-exceptions
  (:require [clojure.tools.logging :as log]
            [nevergreen.errors :refer [error-response]]))

(defn handle-exception [e]
  (log/error e "An unhandled exception was thrown")
  (error-response 500 "An unhandled exception was thrown"))

(defn wrap-exceptions [app]
  (fn [req]
    (try
      (app req)
      (catch Exception e
        (handle-exception e)))))
