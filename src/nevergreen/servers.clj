(ns nevergreen.servers
  (:require [clojure.string :refer [includes?]]
            [clj-cctray.util :refer [in?]]))

(defn detect-server [url]
  (cond
    (nil? url) nil
    (includes? url "//jenkins") :jenkins
    (includes? url ".ci.cloudbees.com") :jenkins
    (includes? url "//hudson") :hudson
    (includes? url "//travis-ci.org") :travis
    (includes? url "/go/") :go
    (includes? url "//circleci.com") :circle
    (includes? url "//teamcity") :team-city
    (includes? url "//cc.rb.") :cruise-control-rb
    (includes? url "//cc.java.") :cruise-control
    (includes? url "//cc.net.") :cruise-control-net
    (includes? url "//api.tddium.com") :solano
    :else :unknown))

(defn unknown-server? [server-type]
  (not (in? [:jenkins
             :hudson
             :travis
             :go
             :circle
             :team-city
             :cruise-control-rb
             :cruise-control
             :cruise-control-net
             :solano] server-type)))
