(ns nevergreen.logging
  (:require [cemerick.url :as u]
            [nevergreen.config :as config])
  (:import ch.qos.logback.classic.Level
           ch.qos.logback.classic.Logger
           (java.net MalformedURLException)
           org.slf4j.LoggerFactory
           org.slf4j.bridge.SLF4JBridgeHandler))

(def ^:const ^:private redacted "REDACTED")

(defn- convert-log-level [level]
  (case level
    :off Level/OFF
    :error Level/ERROR
    :warn Level/WARN
    :info Level/INFO
    :debug Level/DEBUG
    :trace Level/TRACE
    :all Level/ALL
    Level/INFO))

(defn- update-values [m f & args]
  (reduce (fn [r [k v]] (assoc r k (apply f v args))) {} m))

(defn redact-url [url]
  (try
    (-> (u/url url)
        (update :query #(update-values % (constantly redacted)))
        (update :username #(if (nil? %) nil redacted))
        (update :password #(if (nil? %) nil redacted))
        str)
    (catch MalformedURLException _
      url)))

(defn configure-logging []
  (SLF4JBridgeHandler/removeHandlersForRootLogger)
  (SLF4JBridgeHandler/install)
  (when-let [level (config/log-level)]
    (let [^Logger root-logger (cast Logger (LoggerFactory/getLogger Logger/ROOT_LOGGER_NAME))]
      (.setLevel root-logger (convert-log-level level)))))
