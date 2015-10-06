(defproject nevergreen "0.8.0-alpha"
            :description "A build monitor with attitude"
            :url "https://github.com/build-canaries/nevergreen"
            :dependencies [[org.clojure/clojure "1.7.0"]
                           [ring "1.4.0"]
                           [compojure "1.4.0"]
                           [environ "1.0.1"]
                           [cheshire "5.5.0"]
                           [clj-cctray "0.9.0"]
                           [clj-http "2.0.0"]
                           [ring-curl "0.3.0"]
                           [ring/ring-json "0.4.0"]
                           [ring/ring-defaults "0.1.5"]
                           [bk/ring-gzip "0.1.1"]
                           [base64-clj "0.1.1"]]
            :plugins [[lein-ring "0.9.7"]
                      [environ/environ.lein "0.3.1"]]
            :min-lein-version "2.0.0"
            :hooks [environ.leiningen.hooks]
            :ring {:handler nevergreen.app/all-routes :port 5000}
            :uberjar-name "nevergreen-standalone.jar"
            :main nevergreen.app
            :aot [nevergreen.app]
            :profiles {:dev        {:plugins      [[lein-midje "3.1.3"]
                                                   [lein-ancient "0.6.7"]
                                                   [lein-idea "1.0.1"]]
                                    :dependencies [[midje "1.7.0"]
                                                   [clj-webdriver/clj-webdriver "0.7.2"]
                                                   [com.github.detro/phantomjsdriver "1.2.0"]
                                                   [ring/ring-mock "0.3.0"]]}
                       :production {:env {:production true}}})
