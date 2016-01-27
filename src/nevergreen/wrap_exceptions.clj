(ns nevergreen.wrap-exceptions
  (:import (clojure.lang ExceptionInfo)
           (java.util.concurrent ExecutionException))
  (:require [clojure.tools.logging :as log]))

(def headers {"Content-Type" "text/plain; charset=utf-8"})

(def bodies {401 "Unauthorized"
             404 "Not Found"})

(defn get-status [data]
  (or (:status data) 500))

(defn get-body [data]
  (or (:message data) (get bodies (:status data)) "Server Error"))

(defn handle-exception-info [e]
  (let [data (ex-data e)]
    (log/warn "ExceptionInfo thrown with data" data)
    {:status (get-status data) :body (get-body data) :headers headers}))

(defn handle-unknown [e]
  (.printStackTrace e)
  {:status 500 :body (.getMessage e) :headers headers})

(defn wrap-exceptions [app]
  (fn [req]
    (try
      (app req)
      (catch ExecutionException e
        (let [cause (.getCause e)]
          (if (instance? ExceptionInfo cause)
            (handle-exception-info cause)
            (handle-unknown cause))))
      (catch ExceptionInfo e
        (handle-exception-info e))
      (catch Exception e
        (handle-unknown e)))))
