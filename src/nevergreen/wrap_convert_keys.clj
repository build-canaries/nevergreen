(ns nevergreen.wrap-convert-keys
  (:require [camel-snake-kebab.core :refer [->camelCase ->kebab-case]]
            [camel-snake-kebab.extras :refer [transform-keys]]))

(defn wrap-convert-keys [handler]
  (fn [req]
    (let [transformed-req (update-in req [:body] (partial transform-keys ->kebab-case))
          res (handler transformed-req)]
      (update-in res [:body] (partial transform-keys ->camelCase)))))
