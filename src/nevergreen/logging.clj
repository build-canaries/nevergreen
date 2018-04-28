(ns nevergreen.logging
  (:import org.slf4j.bridge.SLF4JBridgeHandler
           ch.qos.logback.classic.Level
           ch.qos.logback.classic.Logger
           org.slf4j.LoggerFactory)
  (:require [nevergreen.config :as config]))

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

(defn configure-logging []
  (SLF4JBridgeHandler/removeHandlersForRootLogger)
  (SLF4JBridgeHandler/install)
  (when-let [level (config/log-level)]
    (let [root-logger (cast Logger (LoggerFactory/getLogger Logger/ROOT_LOGGER_NAME))]
      (.setLevel root-logger (convert-log-level level)))))
