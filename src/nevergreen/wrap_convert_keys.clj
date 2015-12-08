(ns nevergreen.wrap-convert-keys
  (require [camel-snake-kebab.core :refer [->camelCase]]
           [camel-snake-kebab.extras :refer [transform-keys]]))

(defn wrap-convert-keys [app]
  (fn [req]
    (let [res (app req)]
      (transform-keys ->camelCase res))))
