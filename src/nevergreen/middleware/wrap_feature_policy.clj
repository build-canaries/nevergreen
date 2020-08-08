(ns nevergreen.middleware.wrap-feature_policy
  (:require [clojure.string :refer [starts-with? join]]))

(defn- feature-headers []
  ["accelerometer 'none'"
   "autoplay 'self'"
   "camera 'none'"
   "document-domain 'none'"
   "encrypted-media 'none'"
   "fullscreen 'none'"
   "geolocation 'none'"
   "gyroscope 'none'"
   "magnetometer 'none'"
   "microphone 'none'"
   "midi 'none'"
   "payment 'none'"
   "picture-in-picture 'none'"
   "publickey-credentials-get 'none'"
   "screen-wake-lock 'none'"
   "sync-xhr 'none'"
   "usb 'none'"
   "xr-spatial-tracking 'none'"])

(defn wrap-feature-policy [app]
  (fn [req]
    (let [res (app req)]
      (-> res
          (assoc-in [:headers "Feature-Policy"] (join "; " (feature-headers)))))))
