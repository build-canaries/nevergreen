(defproject build-monitor-clj "0.1.0-SNAPSHOT"
            :description "FIXME: write description"
            :url "http://example.com/FIXME"
            :dependencies [[org.clojure/clojure "1.6.0"]
                           [midje "1.6.3"]
                           [ring "1.2.2"]
                           [compojure "1.1.8"]
                           [org.clojure/data.json "0.2.4"]]
            :plugins [[lein-ring "0.8.11"]
                      [lein-midje "3.1.1"]
                      [lein-idea "1.0.1"]
                      [lein-shell "0.4.0"]]
            :ring {:handler build-monitor-clj.app/app :port 9090}
            :main build-monitor-clj.app)
