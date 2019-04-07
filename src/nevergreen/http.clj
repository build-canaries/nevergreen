(ns nevergreen.http
  (:require [clj-http.client :as client]
            [clojure.tools.logging :as log]
            [clojure.string :as s]
            [cemerick.url :as u])
  (:import (java.net UnknownHostException URISyntaxException ConnectException SocketTimeoutException MalformedURLException)
           (clojure.lang ExceptionInfo)))

(def ^:const ten-seconds 10000)
(def ^:const redacted "REDACTED")

(defn ^:dynamic client-get [url data]
  (client/get url data))

(defn ^:dynamic client-post [url data]
  (client/post url data))

(defn ^:dynamic client-patch [url data]
  (client/patch url data))

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
  (throw (ex-info "Connection timeout" {:url url})))

(defn- handle-unknown-host [url redacted-url e]
  (let [host (first (s/split (.getMessage e) #":"))
        msg (str host " is an unknown host, is the URL correct?")]
    (log/info (str "[" redacted-url "] threw an UnknownHostException [" msg "]"))
    (throw (ex-info msg {:url url}))))

(defn- handle-invalid-url [url redacted-url e]
  (let [msg (str "URL is invalid. " (.getMessage e))]
    (log/info (str "[" redacted-url "] threw a " (.getSimpleName (.getClass e)) " [" msg "]"))
    (throw (ex-info msg {:url url}))))

(defn- handle-connection-refused [url redacted-url e]
  (log/info (str "[" redacted-url "] threw a ConnectException [" (.getMessage e) "]"))
  (throw (ex-info "Connection refused, is the URL correct?" {:url url})))

(defn- handle-exception-info [url redacted-url e]
  (let [data (ex-data e)
        status (or (:status data) "unknown")
        phrase (if (s/blank? (:reason-phrase data)) nil (:reason-phrase data))
        msg (str "Server returned a " (or phrase (:status data) "Unknown") " error")]
    (log/info (str "[" redacted-url "] returned a status of [" status "]"))
    (throw (ex-info msg {:url url :status status}))))

(defn- http [url data method]
  (let [redacted-url (redact-url url)]
    (log/info (str "Calling [" redacted-url "]..."))
    (try
      (let [res (method url (merge {:insecure?             true
                                    :socket-timeout        ten-seconds
                                    :conn-timeout          ten-seconds
                                    :throw-entire-message? true
                                    :cookie-policy         :standard}
                                   data))]
        (log/info (str "[" redacted-url "] returned a status of [" (:status res) "]"))
        (:body res))
      (catch SocketTimeoutException e
        (handle-timeout url redacted-url e))
      (catch UnknownHostException e
        (handle-unknown-host url redacted-url e))
      (catch URISyntaxException e
        (handle-invalid-url url redacted-url e))
      (catch ConnectException e
        (handle-connection-refused url redacted-url e))
      (catch ExceptionInfo e
        (handle-exception-info url redacted-url e)))))

(defn http-get [url data]
  (http url data client-get))

(defn http-post [url data]
  (http url data client-post))

(defn http-patch [url data]
  (http url data client-patch))
