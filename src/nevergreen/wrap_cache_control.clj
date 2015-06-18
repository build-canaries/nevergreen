(ns nevergreen.wrap-cache-control)

(defn wrap-cache-control [app]
  (fn [req]
    (let [res (app req)]
      (assoc-in res [:headers "cache-control"] "private, max-age=0, no-cache"))))
