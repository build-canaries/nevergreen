(ns nevergreen.middleware.wrap-feature_policy
  (:require [clojure.string :refer [starts-with? join]]))

(defn- feature-headers []
  ["accelerometer 'none'"
   "ambient-light-sensor 'none'"
   "autoplay 'self'"
   "camera 'none'"
   "encrypted-media 'none'"
   "fullscreen 'none'"
   "geolocation 'none'"
   "gyroscope 'none'"
   "magnetometer 'none'"
   "microphone 'none'"
   "midi 'none'"
   "payment 'none'"
   "picture-in-picture 'none'"
   "speaker 'self'"
   "usb 'none'"
   "vr 'none'"])

(defn wrap-feature-policy [app]
  (fn [req]
    (let [res (app req)]
      (-> res
          (assoc-in [:headers "Feature-Policy"] (join "; " (feature-headers)))))))
