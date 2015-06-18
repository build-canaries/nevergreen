(ns nevergreen.wrap-cors-headers)

(defn wrap-cors-headers [app]
  (fn [req]
    (let [res (app req)]
      (-> res
          (assoc-in [:headers "Access-Control-Allow-Methods"] "POST, GET, OPTIONS")
          (assoc-in [:headers "Access-Control-Allow-Origin"] "*")))))