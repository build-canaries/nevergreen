(ns nevergreen.gateway
  (:require [clj-http.client :as client]
            [clojure.tools.logging :as log]
            [clojure.string :as s]
            [cemerick.url :as u])
  (:import (java.net UnknownHostException URISyntaxException ConnectException SocketTimeoutException)
           (clojure.lang ExceptionInfo)
           (java.util.concurrent TimeUnit TimeoutException ExecutionException)))

(def ^:const ten-seconds 10000)
(def ^:const redacted "REDACTED")

(defn ^:dynamic client-get [url data]
  (client/get url data (fn [_]) (fn [_])))

(defn ^:dynamic client-post [url data]
  (client/post url data (fn [_]) (fn [_])))

(defn ^:dynamic client-patch [url data]
  (client/patch url data (fn [_]) (fn [_])))

(defn ^:dynamic client-put [url data]
  (client/put url data (fn [_]) (fn [_])))

(defn- update-values [m f & args]
  (reduce (fn [r [k v]] (assoc r k (apply f v args))) {} m))

(defn- redact-url [url]
  (-> (u/url url)
      (update :query #(update-values % (constantly redacted))) ; query params might contain an API token so redact
      (update :username #(if (nil? %) nil redacted))
      (update :password #(if (nil? %) nil redacted))
      str))

(defn- handle-timeout [url redacted-url e]
  (log/info (str "[" redacted-url "] threw a SocketTimeoutException [" (.getMessage e) "]"))
  (throw (ex-info "Connection timeout" {:url url :status 504})))

(defn- handle-client-timeout [url redacted-url e]
  (log/info (str "[" redacted-url "] couldn't produce response within given time. Explicitly closing connection"))
  (throw (ex-info "Deadline timeout" {:url url :status 504})))

(defn- handle-unknown-host [url redacted-url e]
  (let [host (first (s/split (.getMessage e) #":"))
        msg (str host " is an unknown host, is the URL correct?")]
    (log/info (str "[" redacted-url "] threw an UnknownHostException [" msg "]"))
    (throw (ex-info msg {:url url :status 400}))))

(defn- handle-invalid-url [url redacted-url e]
  (let [msg (str "URL is invalid. " (.getMessage e))]
    (log/info (str "[" redacted-url "] threw a " (.getSimpleName (.getClass e)) " [" msg "]"))
    (throw (ex-info msg {:url url :status 400}))))

(defn- handle-connection-refused [url redacted-url e]
  (log/info (str "[" redacted-url "] threw a ConnectException [" (.getMessage e) "]"))
  (throw (ex-info "Connection refused, is the URL correct?" {:url url :status 502})))

(defn- handle-exception-info [url redacted-url e]
  (let [data (ex-data e)
        status (or (:status data) 502)
        phrase (if (s/blank? (:reason-phrase data)) nil (:reason-phrase data))
        msg (str "Server returned a " (or phrase (:status data) "Unknown") " error")]
    (log/info (str "[" redacted-url "] returned a status of [" status "]"))
    (throw (ex-info msg {:url url :status status}))))

(defn- http [url data method]
  (let [redacted-url (redact-url url)]
    (log/info (str "Calling [" redacted-url "]..."))
    (let [future (method url (merge {:insecure?             true
                                     :socket-timeout        ten-seconds
                                     :conn-timeout          ten-seconds
                                     :throw-entire-message? true
                                     :cookie-policy         :standard
                                     :async                 true}
                                    data))]
      (try
        (let [res (.get future 1 TimeUnit/MINUTES)]
          (log/info (str "[" redacted-url "] returned a status of [" (.getStatusCode (.getStatusLine res)) "]"))
          (.getContent (.getEntity res)))
        (catch ExecutionException e
          (let [original-exception (.getCause e)]
            (condp instance? original-exception
              UnknownHostException (handle-unknown-host url redacted-url original-exception)
              URISyntaxException (handle-invalid-url url redacted-url original-exception)
              ConnectException (handle-connection-refused url redacted-url original-exception)
              ExceptionInfo (handle-exception-info url redacted-url original-exception)
              SocketTimeoutException (handle-timeout url redacted-url original-exception))))
        (catch TimeoutException e
          (.cancel future true)
          (handle-client-timeout url redacted-url e))))))

(defn http-get [url data]
  (http url data client-get))

(defn http-post [url data]
  (http url data client-post))

(defn http-patch [url data]
  (http url data client-patch))

(defn http-put [url data]
  (http url data client-put))
