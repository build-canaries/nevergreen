(ns nevergreen.gateway
  (:require [clj-http.client :as client]
            [clojure.tools.logging :as log]
            [clojure.string :as s]
            [cemerick.url :as u])
  (:import (java.net UnknownHostException URISyntaxException ConnectException SocketTimeoutException)
           (clojure.lang ExceptionInfo)
           (java.time Duration)
           (java.util.concurrent Future)))

(def ^:const ten-seconds 10000)
(def ^:const redacted "REDACTED")

(defn on-respond [promise]
  (fn [response] (deliver promise (:body response))))

(defn on-raise [promise]
  (fn [exception] (deliver promise exception)))

(defn get-result [promise timeout-ms timeout-val]
  (deref promise timeout-ms timeout-val))

(defn ^:dynamic *client-get* [url data promise]
  (client/get url data (on-respond promise) (on-raise promise)))

(defn ^:dynamic *client-post* [url data promise]
  (client/post url data (on-respond promise) (on-raise promise)))

(defn ^:dynamic *client-patch* [url data promise]
  (client/patch url data (on-respond promise) (on-raise promise)))

(defn ^:dynamic *client-put* [url data promise]
  (client/put url data (on-respond promise) (on-raise promise)))

(defn ^:dynamic *client-head* [url data promise]
  (client/head url data (on-respond promise) (on-raise promise)))

(defn- update-values [m f & args]
  (reduce (fn [r [k v]] (assoc r k (apply f v args))) {} m))

(defn- redact-url [url]
  (-> (u/url url)
      (update :query #(update-values % (constantly redacted))) ; query params might contain an API token so redact
      (update :username #(if (nil? %) nil redacted))
      (update :password #(if (nil? %) nil redacted))
      str))

(defn- handle-timeout [url redacted-url ^Exception e]
  (log/info (str "[" redacted-url "] threw a SocketTimeoutException [" (.getMessage e) "]"))
  (throw (ex-info "Connection timeout" {:url url :status 504})))

(defn- handle-client-timeout [url redacted-url]
  (log/info (str "[" redacted-url "] couldn't produce response within given time. Explicitly closing connection"))
  (throw (ex-info "Deadline timeout" {:url url :status 504})))

(defn- handle-unknown-host [url redacted-url ^Exception e]
  (let [host (first (s/split (.getMessage e) #":"))
        msg (str host " is an unknown host, is the URL correct?")]
    (log/info (str "[" redacted-url "] threw an UnknownHostException [" msg "]"))
    (throw (ex-info msg {:url url :status 400}))))

(defn- handle-invalid-url [url redacted-url ^Exception e]
  (let [msg (str "URL is invalid. " (.getMessage e))]
    (log/info (str "[" redacted-url "] threw a " (.getSimpleName (.getClass e)) " [" msg "]"))
    (throw (ex-info msg {:url url :status 400}))))

(defn- handle-connection-refused [url redacted-url ^Exception e]
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
    (let [promise (promise)
          ^Future future (method url (merge {:insecure?             true
                                             :socket-timeout        ten-seconds
                                             :conn-timeout          ten-seconds
                                             :throw-entire-message? true
                                             :cookie-policy         :standard
                                             :async                 true}
                                            data) promise)
          result (get-result promise (.toMillis (Duration/ofSeconds 50)) :deadline-timeout)]
      (when (= result :deadline-timeout)
        (.cancel future true)
        (handle-client-timeout url redacted-url))
      (condp instance? result
        UnknownHostException (handle-unknown-host url redacted-url result)
        URISyntaxException (handle-invalid-url url redacted-url result)
        ConnectException (handle-connection-refused url redacted-url result)
        ExceptionInfo (handle-exception-info url redacted-url result)
        SocketTimeoutException (handle-timeout url redacted-url result)
        result))))

(defn http-get [url data]
  (http url data *client-get*))

(defn http-post [url data]
  (http url data *client-post*))

(defn http-patch [url data]
  (http url data *client-patch*))

(defn http-put [url data]
  (http url data *client-put*))

(defn http-head [url data]
  (http url data *client-head*))
