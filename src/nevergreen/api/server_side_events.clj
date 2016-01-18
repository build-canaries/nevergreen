(ns nevergreen.api.server-side-events
  (:require [org.httpkit.server :refer :all]))

(def ^:private channel-hub (atom {}))

(def ^:private headers {"Content-Type"  "text/event-stream"
                        "Cache-Control" "no-cache"
                        "Connection"    "keep-alive"})

(defn handler [request]
  (with-channel request channel
                (swap! channel-hub assoc channel request)
                (on-close channel (fn [_]
                                    (swap! channel-hub dissoc channel)))))

(defn push-msg [msg]
  (doseq [channel (keys @channel-hub)]
    (send! channel
           {:status  200
            :headers headers
            :body    (str "data: " msg "\n\n")},
           false)))
