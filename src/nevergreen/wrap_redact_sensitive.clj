(ns nevergreen.wrap-redact-sensitive)

(def redacted "*****")

(defn wrap-redact-sensitive [handler]
  (fn [req]
    (if-let [password (get-in req [:body :password])]
      (handler (-> req
                   (assoc-in [:body :password] redacted)
                   (assoc-in [:redacted :password] password)))
      (handler req))))

(defn wrap-restore-sensitive [handler]
  (fn [req]
    (if-let [password (get-in req [:redacted :password])]
      (handler (assoc-in req [:body :password] password))
      (handler req))))
