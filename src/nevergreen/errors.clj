(ns nevergreen.errors
  (:require [clojure.tools.logging :as log])
  (:import (java.time Clock)))

(defn ^:dynamic now []
  (.instant (Clock/systemUTC)))

(defn is-error? [o]
  (and (map? o) (= (:prognosis o) :error)))

(defmulti create-error
          (fn [error _] (class error)))

(defmethod create-error Exception [e url]
  (create-error (or
                  (.getMessage e)
                  (.getSimpleName (.getClass e)))
                url))

(defmethod create-error String [message url]
  (log/info (str "Creating error response for [" url "] with message [" message "]"))
  {:description message
   :timestamp   (now)
   :web-url     url
   :prognosis   :error})

(defn error-response [status message url]
  {:status  status
   :body    (create-error message url)
   :headers {"Content-Type" "application/json; charset=utf-8"}})
