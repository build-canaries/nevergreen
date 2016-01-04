(ns nevergreen.http
  (:require [clj-http.client :as client]
            [clojure.tools.logging :as log]))

(defn http-get [url auth-header]
  (log/info (str "GETing from [" url "]..."))
  (let [res (client/get url {:insecure?             true
                             :timeout               30000
                             :headers               (merge {"Accept" "application/xml"} auth-header)
                             :as                    :stream
                             :throw-entire-message? true})]
    (log/info (str "GET from [" url "] returned a status of [" (:status res) "]"))
    (:body res)))