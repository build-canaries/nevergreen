(ns nevergreen.wrap-cache-control
  (:require [clojure.string :refer [starts-with?]]))

(def no-cache "private, max-age=0, no-store")
(def max-cache "max-age=31556926")
(def twelve-hour-cache "max-age=43200")

(defn- is-webpack-hashed [req]
  (re-matches #"^.+?\.\w{8}\..+$" (:uri req)))

(defn- is-client-route-refresh [req]
  (re-matches #"^[^.]*$" (:uri req)))

(defn wrap-no-cache [app]
  (fn [req]
    (let [res (app req)]
      (assoc-in res [:headers "Cache-Control"] no-cache))))

(defn wrap-cache-control [app]
  (fn [req]
    (let [res (app req)]
      (assoc-in res [:headers "Cache-Control"] (cond
                                                 (= "/service-worker.js" (:uri req)) no-cache
                                                 (= "/index.html" (:uri req)) twelve-hour-cache
                                                 (is-client-route-refresh req) twelve-hour-cache
                                                 (is-webpack-hashed req) max-cache
                                                 :else twelve-hour-cache)))))
