(ns nevergreen.http
  (:require [clj-http.client :as client]))

(defn http-get [url auth-header]
  (:body (client/get url {:insecure? true
                          :timeout   30000
                          :headers   {"Accept" "application/xml"}
                          :as        :stream})))