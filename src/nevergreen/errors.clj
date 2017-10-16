(ns nevergreen.errors
  (:require [cheshire.core :as json]))

(defn is-error? [o]
  (and (map? o) (contains? o :error)))

(defn create-error [message]
  {:error message})

(defn error-response [status, message]
  {:status  status
   :body    (json/generate-string (create-error message) {:pretty true})
   :headers {"Content-Type" "application/json; charset=utf-8"}})
