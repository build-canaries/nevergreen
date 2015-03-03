(ns nevergreen.wrap-exceptions
  (:import (clojure.lang ExceptionInfo)))

(defn wrap-exceptions [app]
  (fn [req]
    (try
      (app req)
      (catch ExceptionInfo e
        {:status 500 :body (str (-> e .getData :object :status))})
      (catch Exception e
        {:status 500 :body (.getMessage e)}))))
