(ns nevergreen.wrap-exceptions
  (:require [clojure.tools.logging :as log]
            [nevergreen.errors :refer [error-response]]))

(defn handle-exception [e url]
  (log/error e (str "An unhandled exception was thrown by endpoint [" url "]"))
  (error-response 500 "An unhandled exception was thrown" url))

(defn wrap-exceptions [app]
  (fn [req]
    (try
      (app req)
      (catch Exception e
        (if-let [data (ex-data e)]
          (error-response (or (:status data) 500) (.getMessage e) (:uri req))
          (handle-exception e (:uri req)))))))
