(ns nevergreen.wrap-cors-headers
  (:require [clj-cctray.util :refer [in?]]))

(def ^:private twenty-four-hours (str (* 60 60 24)))
(def ^:private allowed-methods [:post :get :options])

(defn wrap-cors-headers [app]
  (fn [req]
    (let [res (app req)]
      (if (in? allowed-methods (req :request-method))
        (-> res
            (assoc-in [:headers "Access-Control-Allow-Methods"] "POST, GET, OPTIONS")
            (assoc-in [:headers "Access-Control-Allow-Origin"] "*")
            (assoc-in [:headers "Access-Control-Max-Age"] twenty-four-hours)
            (assoc-in [:headers "Access-Control-Allow-Headers"] "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma"))))))
