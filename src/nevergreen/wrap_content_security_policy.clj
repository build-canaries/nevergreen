(ns nevergreen.wrap-content-security-policy
  (:require [clojure.string :refer [starts-with? join]]
            [nevergreen.config :as config]
            [ring.util.response :refer [get-header]]))

(defn- csp-headers []
  ["default-src 'self'"
   "script-src 'self'"
   "worker-src 'self'"
   "style-src 'self' 'unsafe-inline'"
   "img-src * data:"
   "font-src 'self' data:"
   "media-src *"
   "connect-src 'self' https://api.github.com https://gist.githubusercontent.com https://gitlab.com"
   "object-src 'none'"
   (str "frame-ancestors " (config/allow-iframe-from))])

(defn wrap-content-security-policy [app]
  (fn [req]
    (let [res (app req)]
      (-> res
          (assoc-in [:headers "X-Frame-Options"] nil)
          (assoc-in [:headers "Content-Security-Policy"] (join "; " (csp-headers)))))))
