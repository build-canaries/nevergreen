(ns nevergreen.http
  (:require [clj-http.client :as client]
            [clojure.tools.logging :as log]
            [clojure.string :as s])
  (:import (java.net UnknownHostException URISyntaxException ConnectException SocketTimeoutException)
           (clojure.lang ExceptionInfo)))

(def ^:const ten-seconds 10000)
(def ^:const thirty-seconds 30000)

(defn http-get [url additional-headers]
  (log/info (str "GETing from [" url "]..."))
  (try
    (let [res (client/get url {:insecure?             true
                               :socket-timeout        thirty-seconds
                               :conn-timeout          ten-seconds
                               :headers               (merge {"Accept" "application/xml"} additional-headers)
                               :as                    :stream
                               :throw-entire-message? true
                               :cookie-policy         :standard})]
      (log/info (str "GET from [" url "] returned a status of [" (:status res) "]"))
      (:body res))
    (catch SocketTimeoutException e
      (log/info (str "GET from [" url "] threw an SocketTimeoutException [" (.getMessage e) "]"))
      (throw (ex-info "Connection timeout, is the URL correct?" {:url url})))
    (catch UnknownHostException e
      (let [host (first (s/split (.getMessage e) #":"))
            msg (str host " is an unknown host")]
        (log/info (str "GET from [" url "] threw an UnknownHostException [" msg "]"))
        (throw (ex-info msg {:url url}))))
    (catch URISyntaxException e
      (let [msg (.getMessage e)]
        (log/info (str "GET from [" url "] threw a URISyntaxException [" msg "]"))
        (throw (ex-info msg {:url url}))))
    (catch ConnectException e
      (log/info (str "GET from [" url "] threw a ConnectException [" (.getMessage e) "]"))
      (throw (ex-info "Connection refused, is the URL correct?" {:url url})))
    (catch ExceptionInfo e
      (let [data (ex-data e)
            status (or (:status data) "unknown")
            msg (or (:reason-phrase data) "Unknown error")]
        (log/info (str "GET from [" url "] returned a status of [" status " : " msg "]"))
        (throw (ex-info msg {:url url :status status}))))))
