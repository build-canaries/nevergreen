(ns nevergreen.wrap-content-security-policy
  (:require [clojure.string :refer [starts-with? join]]
            [ring.util.response :refer [get-header]]))

(def ^:private default-src "default-src 'self'")
(def ^:private img-src "img-src * data:")
(def ^:private font-src "font-src 'self' data:")
(def ^:private media-src "media-src *")
(def ^:private connect-src "connect-src 'self' https://api.github.com")
(def ^:private object-src "object-src 'none'")
(def ^:private child-src "child-src 'none'")
(def ^:private sources [default-src img-src font-src media-src connect-src object-src child-src])

(defn wrap-content-security-policy [app]
  (fn [req]
    (let [res (app req)]
      (assoc-in res [:headers "content-security-policy"] (join "; " sources)))))
