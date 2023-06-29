(ns nevergreen.middleware.wrap-permissions-policy
  (:require [clojure.string :refer [join]]))

(defn- feature-headers []
  ["accelerometer=()"
   "autoplay=(self)"
   "camera=()"
   "display-capture=()"
   "encrypted-media=()"
   "fullscreen=(self)"
   "geolocation=()"
   "gyroscope=()"
   "hid=()"
   "identity-credentials-get=()"
   "idle-detection=()"
   "local-fonts=()"
   "magnetometer=()"
   "microphone=()"
   "midi=()"
   "payment=()"
   "picture-in-picture=()"
   "publickey-credentials-get=()"
   "screen-wake-lock=()"
   "usb=()"
   "xr-spatial-tracking=()"])

(defn wrap-permissions-policy [app]
  (fn [req]
    (let [res (app req)]
      (-> res
          (assoc-in [:headers "Permissions-Policy"] (join ", " (feature-headers)))))))
