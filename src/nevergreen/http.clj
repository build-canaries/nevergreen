(ns nevergreen.http
  (:require [clj-http.client :as client]
            [clojure.tools.logging :as log]
            [clojure.string :as s]
            [cemerick.url :as u])
  (:import (java.net UnknownHostException URISyntaxException ConnectException SocketTimeoutException)
           (clojure.lang ExceptionInfo)))

(def ^:const ten-seconds 10000)
(def ^:const thirty-seconds 30000)
(def ^:const redacted "REDACTED")

(defn- update-values [m f & args]
  (reduce (fn [r [k v]] (assoc r k (apply f v args))) {} m))

(defn- redacted-url [url]
  (-> (u/url url)
      (update :query #(update-values % (constantly redacted))) ; query params might contain an API token so redact
      (update :username #(if (nil? %) nil redacted))
      (update :password #(if (nil? %) nil redacted))
      str))

(defn http-get [url additional-headers]
  (log/info (str "GETing from [" (redacted-url url) "]..."))
  (try
    (let [res (client/get url {:insecure?             true
                               :socket-timeout        thirty-seconds
                               :conn-timeout          ten-seconds
                               :headers               (merge {"Accept" "application/xml"} additional-headers)
                               :as                    :stream
                               :throw-entire-message? true
                               :cookie-policy         :standard})]
      (log/info (str "GET from [" (redacted-url url) "] returned a status of [" (:status res) "]"))
      (:body res))
    (catch SocketTimeoutException e
      (log/info (str "GET from [" (redacted-url url) "] threw an SocketTimeoutException [" (.getMessage e) "]"))
      (throw (ex-info "Connection timeout, is the URL correct?" {:url url})))
    (catch UnknownHostException e
      (let [host (first (s/split (.getMessage e) #":"))
            msg (str host " is an unknown host")]
        (log/info (str "GET from [" (redacted-url url) "] threw an UnknownHostException [" msg "]"))
        (throw (ex-info msg {:url url}))))
    (catch URISyntaxException e
      (let [msg (.getMessage e)]
        (log/info (str "GET from [" (redacted-url url) "] threw a URISyntaxException [" msg "]"))
        (throw (ex-info msg {:url url}))))
    (catch ConnectException e
      (log/info (str "GET from [" (redacted-url url) "] threw a ConnectException [" (.getMessage e) "]"))
      (throw (ex-info "Connection refused, is the URL correct?" {:url url})))
    (catch ExceptionInfo e
      (let [data (ex-data e)
            status (or (:status data) "unknown")
            msg (or (:reason-phrase data) "Unknown error")]
        (log/info (str "GET from [" (redacted-url url) "] returned a status of [" status " : " msg "]"))
        (throw (ex-info msg {:url url :status status}))))))
