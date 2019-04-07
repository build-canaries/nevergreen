(ns nevergreen.wrap-convert-keys
  (:require [camel-snake-kebab.core :refer [->camelCase ->kebab-case]]
            [camel-snake-kebab.extras :refer [transform-keys]]))

(defn wrap-convert-keys [app]
  (fn [req]
    (let [transformed-req (update-in req [:body] (partial transform-keys ->kebab-case))
          res (app transformed-req)]
      (update-in res [:body] (partial transform-keys ->camelCase)))))

(defn wrap-convert-keys-req [app]
  (fn [req]
    (app (update-in req [:body] (partial transform-keys ->kebab-case)))))

(defn wrap-convert-keys-res [app]
  (fn [req]
    (let [res (app req)]
      (update-in res [:body] (partial transform-keys ->camelCase)))))
