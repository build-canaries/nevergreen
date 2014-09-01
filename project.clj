(defproject build-monitor-clj "0.1.0-SNAPSHOT"
            :description "An interesting build monitor"
            :url "https://github.com/cowley05/build-monitor-clj"
            :dependencies [[org.clojure/clojure "1.6.0"]
                           [midje "1.6.3"]
                           [ring "1.2.2"]
                           [environ "0.5.0"]
                           [compojure "1.1.8"]
                           [cheshire "5.3.1"]]
            :plugins [[lein-ring "0.8.11"]
                      [lein-midje "3.1.1"]
                      [environ/environ.lein "0.2.1"]
                      [lein-idea "1.0.1"]]
            :min-lein-version "2.0.0"
            :hooks [environ.leiningen.hooks]
            :ring {:handler build-monitor-clj.app/app :port 5000}
            :uberjar-name "build-monitor-clj-standalone.jar"
            :main build-monitor-clj.app
            :aot [build-monitor-clj.app]
            :profiles {:production {:env {:production true}}})
