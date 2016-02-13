(ns nevergreen.http
  (:require [clj-http.client :as client]
            [clojure.tools.logging :as log]
            [clojure.string :as s])
  (:import (java.net UnknownHostException URISyntaxException)))

(defn http-get [url auth-header]
  (log/info (str "GETing from [" url "]..."))
  (try
    (let [res (client/get url {:insecure?             true
                               :timeout               30000
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
