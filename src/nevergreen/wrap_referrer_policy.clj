(ns nevergreen.wrap-referrer-policy
  (:require [ring.util.response :refer [get-header]]))

(defn wrap-referrer-policy [app]
  (fn [req]
    (let [res (app req)]
      (assoc-in res [:headers "Referrer-Policy"] "strict-origin-when-cross-origin"))))
