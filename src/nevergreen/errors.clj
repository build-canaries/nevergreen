(ns nevergreen.errors
  (:require [cheshire.core :as json]))

(defn is-error? [o]
  (and (map? o) (contains? o :error)))

(defmulti create-error
          (fn [error url] (class error)))

(defmethod create-error Exception [e url]
  (create-error (str (.getSimpleName (.getClass e)) ": " (.getMessage e)) url))

(defmethod create-error String [message url]
  {:error message :url url})

(defn error-response [status message url]
  {:status  status
   :body    (json/generate-string (create-error message url) {:pretty true})
   :headers {"Content-Type" "application/json; charset=utf-8"}})
