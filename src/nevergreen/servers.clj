(ns nevergreen.servers
  (:require [clj-cctray.util :refer [in?]]))

(defn detect-server [url]
  (cond
    (nil? url) nil
    (.contains url "//jenkins") :jenkins
    (.contains url ".ci.cloudbees.com") :jenkins
    (.contains url "//hudson") :hudson
    (.contains url "//travis-ci.org") :travis
    (.contains url "/go/") :go
    (.contains url "//snap-ci.com") :snap
    (.contains url "//circleci.com") :circle
    (.contains url "//teamcity") :team-city
    (.contains url "//cc.rb.") :cruise-control-rb
    (.contains url "//cc.java.") :cruise-control
    (.contains url "//cc.net.") :cruise-control-net
    (.contains url "//api.tddium.com") :solano
    :else :unknown))

(defn unknown-server? [server-type]
  (not (in? [:jenkins
             :hudson
             :travis
             :go
             :snap
             :circle
             :team-city
             :cruise-control-rb
             :cruise-control
             :cruise-control-net
             :solano] server-type)))