(ns nevergreen.middleware.wrap-content-security-policy
  (:require [clojure.string :as s]
            [nevergreen.config :as config]))

(defn ^:dynamic allow-iframe-from []
  (config/allow-iframe-from))

(defn- csp-headers []
  ["default-src 'self'"
   "script-src 'self'"
   "worker-src 'self'"
   "style-src 'self' 'unsafe-inline'"
   "img-src * data:"
   "font-src 'self' data:"
   "media-src *"
   "connect-src 'self' https://api.github.com"
   "object-src 'none'"
   (str "frame-ancestors " (allow-iframe-from))])

(defn wrap-content-security-policy [app]
  (fn [req]
    (let [res (app req)]
      (-> (if (= (allow-iframe-from) config/default-csp-frame-ancestors)
            (assoc-in res [:headers "X-Frame-Options"] config/default-x-frame-option)
            (assoc-in res [:headers "X-Frame-Options"] nil))
          (assoc-in [:headers "Content-Security-Policy"] (s/join "; " (csp-headers)))))))
