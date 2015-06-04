(defproject nevergreen "0.6.0"
            :description "A build monitor with attitude"
            :url "https://github.com/build-canaries/nevergreen"
            :dependencies [[org.clojure/clojure "1.6.0"]
                           [ring "1.3.2"]
                           [environ "1.0.0"]
                           [compojure "1.3.4"]
                           [cheshire "5.4.0"]
                           [clj-cctray "0.8.0"]
                           [clj-http "1.1.2"]
                           [ring-curl "0.2.1"]
                           [ring/ring-json "0.3.1"]
                           [base64-clj "0.1.1"]]
            :plugins [[lein-ring "0.8.11"]
                      [environ/environ.lein "0.2.1"]]
            :min-lein-version "2.0.0"
            :hooks [environ.leiningen.hooks]
            :ring {:handler nevergreen.app/app :port 5000}
            :uberjar-name "nevergreen-standalone.jar"
            :main nevergreen.app
            :aot [nevergreen.app]
            :profiles {:dev        {:plugins      [[lein-midje "3.1.3"]
                                                   [lein-ancient "0.5.5"]
                                                   [lein-idea "1.0.1"]]
                                    :dependencies [[midje "1.6.3"]
                                                   [clj-webdriver/clj-webdriver "0.6.1"]
                                                   [com.github.detro/phantomjsdriver "1.2.0"]]}
                       :production {:env {:production true}}})
