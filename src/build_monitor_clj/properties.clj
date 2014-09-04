(ns build-monitor-clj.properties)

(defn cctray-url []
  (System/getenv "CCTRAY_URL"))
