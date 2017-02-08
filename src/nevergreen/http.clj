(ns nevergreen.http
  (:require [clj-http.client :as client]
            [clojure.tools.logging :as log]
            [clojure.string :as s])
  (:import (java.net UnknownHostException URISyntaxException)))

(def ^:const ten-seconds 10000)
(def ^:const thirty-seconds 30000)

(defn http-get [url auth-header]
  (log/info (str "GETing from [" url "]..."))
  (try
    (let [res (client/get url {:insecure?             true
                               :socket-timeout        thirty-seconds
                               :conn-timeout          ten-seconds
                               :headers               (merge {"Accept" "application/xml"} auth-header)
                               :as                    :stream
                               :throw-entire-message? true})]
      (log/info (str "GET from [" url "] returned a status of [" (:status res) "]"))
      (:body res))
    (catch UnknownHostException e
      (let [host (first (s/split (.getMessage e) #":"))
            msg (str host " is an unknown host")]
        (throw (ex-info msg {:status 422 :message msg}))))
    (catch URISyntaxException e
      (let [msg (.getMessage e)]
        (throw (ex-info msg {:status 422 :message msg}))))))
