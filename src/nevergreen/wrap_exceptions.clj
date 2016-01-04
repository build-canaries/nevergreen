(ns nevergreen.wrap-exceptions
  (:import (clojure.lang ExceptionInfo))
  (:require [clojure.tools.logging :as log]))

(def headers {"Content-Type" "text/plain; charset=utf-8"})

(def bodies {401 "Unauthorized"
             404 "Not Found"})

(defn get-status [data]
  (or (:status data) 500))

(defn get-body [data]
  (or (get bodies (:status data)) "Server Error"))

(defn wrap-exceptions [app]
  (fn [req]
    (try
      (app req)
      (catch ExceptionInfo e
        (let [data (ex-data e)]
          (log/warn "ExceptionInfo thrown with data" data)
          {:status (get-status data) :body (get-body data) :headers headers}))
      (catch Exception e
        (log/error (str "Unexpected expection thrown with message [" (.getMessage e) "]"))
        {:status 500 :body (.getMessage e) :headers headers}))))
