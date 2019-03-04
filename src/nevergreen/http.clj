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

(defn- update-values [m f & args]
  (reduce (fn [r [k v]] (assoc r k (apply f v args))) {} m))

(defn- redact-url [url]
  (-> (u/url url)
      (update :query #(update-values % (constantly redacted))) ; query params might contain an API token so redact
      (update :username #(if (nil? %) nil redacted))
      (update :password #(if (nil? %) nil redacted))
      str))

(defn- handle-timeout [url redacted-url e]
  (log/info (str "GET from [" redacted-url "] threw a SocketTimeoutException [" (.getMessage e) "]"))
  (throw (ex-info "Connection timeout calling the CI server" {:url url})))

(defn- handle-unknown-host [url redacted-url e]
  (let [host (first (s/split (.getMessage e) #":"))
        msg (str host " is an unknown host, is the URL correct?")]
    (log/info (str "GET from [" redacted-url "] threw an UnknownHostException [" msg "]"))
    (throw (ex-info msg {:url url}))))

(defn- handle-invalid-url [url redacted-url e]
  (let [msg (str "URL is invalid. " (.getMessage e))]
    (log/info (str "GET from [" redacted-url "] threw a " (.getSimpleName (.getClass e)) " [" msg "]"))
    (throw (ex-info msg {:url url}))))

(defn- handle-connection-refused [url redacted-url e]
  (log/info (str "GET from [" redacted-url "] threw a ConnectException [" (.getMessage e) "]"))
  (throw (ex-info "Connection refused, is the URL correct?" {:url url})))

(defn- handle-exception-info [url redacted-url e]
  (let [data (ex-data e)
        status (or (:status data) "unknown")
        phrase (if (s/blank? (:reason-phrase data)) nil (:reason-phrase data))
        msg (str "CI server returned a " (or phrase (:status data) "Unknown Error"))]
    (log/info (str "GET from [" redacted-url "] returned a status of [" status "]"))
    (throw (ex-info msg {:url url :status status}))))

(defn http-get [url additional-headers]
  (let [redacted-url (redact-url url)]
    (log/info (str "GETing from [" redacted-url "]..."))
    (try
      (let [res (client-get url {:insecure?             true
                                 :socket-timeout        ten-seconds
                                 :conn-timeout          ten-seconds
                                 :headers               (merge {"Accept" "application/xml"} additional-headers)
                                 :as                    :stream
                                 :throw-entire-message? true
                                 :cookie-policy         :standard})]
        (log/info (str "GET from [" redacted-url "] returned a status of [" (:status res) "]"))
        (:body res))
      (catch SocketTimeoutException e
        (handle-timeout url redacted-url e))
      (catch UnknownHostException e
        (handle-unknown-host url redacted-url e))
      (catch URISyntaxException e
        (handle-invalid-url url redacted-url e))
      (catch MalformedURLException e
        (handle-invalid-url url redacted-url e))
      (catch ConnectException e
        (handle-connection-refused url redacted-url e))
      (catch ExceptionInfo e
        (handle-exception-info url redacted-url e)))))
