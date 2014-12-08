(defproject nevergreen "0.2.0"
            :description "A build monitor with attitude"
            :url "https://github.com/build-canaries/nevergreen"
            :dependencies [[org.clojure/clojure "1.6.0"]
                           [midje "1.6.3"]
                           [ring "1.2.2"]
                           [environ "0.5.0"]
                           [compojure "1.1.8"]
                           [cheshire "5.3.1"]
                           [clj-cctray "0.6.0"]]
            :plugins [[lein-ring "0.8.11"]
                      [lein-midje "3.1.1"]
                      [environ/environ.lein "0.2.1"]
                      [lein-idea "1.0.1"]]
            :min-lein-version "2.0.0"
            :hooks [environ.leiningen.hooks]
            :ring {:handler nevergreen.app/app :port 5000}
            :uberjar-name "nevergreen-standalone.jar"
            :main nevergreen.app
            :aot [nevergreen.app]
            :profiles {:production {:env {:production true}}})
