(ns nevergreen.errors
  (:require [cheshire.core :as json]
            [clojure.tools.logging :as log]))

(defn is-error? [o]
  (and (map? o) (:is-error o)))

(defmulti create-error
          (fn [error _] (class error)))

(defmethod create-error Exception [e url]
  (create-error (or
                  (.getMessage e)
                  (.getSimpleName (.getClass e)))
                url))

(defmethod create-error String [message url]
  (log/info (str "Creating error response for [" url "] with message [" message "]"))
  {:error-message message :url url :is-error true})

(defn error-response [status message url]
  {:status  status
   :body    (json/generate-string (create-error message url) {:pretty true})
   :headers {"Content-Type" "application/json; charset=utf-8"}})
