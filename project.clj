(defproject nevergreen "0.0.0"
  :description "A build monitor with attitude"
  :url "https://github.com/build-canaries/nevergreen"
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [ring "1.7.1" :exclusions [org.eclipse.jetty/jetty-server]]
                 [org.eclipse.jetty/jetty-server "9.4.15.v20190215"]
                 [compojure "1.6.1"]
                 [environ "1.1.0"]
                 [cheshire "5.8.1"]
                 [clj-cctray "1.0.2"]
                 [clj-http "3.9.1"]
                 [ring-curl "1.0.1"]
                 [ring/ring-json "0.4.0"]
                 [ring/ring-defaults "0.3.2"]
                 [bk/ring-gzip "0.3.0"]
                 [ring-basic-authentication "1.0.5"]
                 [base64-clj "0.1.1"]
                 [camel-snake-kebab "0.4.0"]
                 [com.cemerick/url "0.1.1"]
                 [ch.qos.logback/logback-classic "1.2.3"]
                 [org.slf4j/log4j-over-slf4j "1.7.26"]
                 [org.slf4j/jul-to-slf4j "1.7.26"]
                 [org.slf4j/jcl-over-slf4j "1.7.26"]]
  :min-lein-version "2.0.0"
  :uberjar-name "nevergreen-standalone.jar"
  :main nevergreen.app
  :aot [nevergreen.app]
  :javac-options ["-Dclojure.compiler.direct-linking=true"]
  :aliases {"unit"       ["with-profile" "+unit" "midje" ":config" "./config/.midje.clj"]
            "lint"       ["with-profile" "+unit" "eastwood"]}
  :profiles {:dev        {:plugins      [[lein-midje "3.2.1"]
                                         [lein-ancient "0.6.15"]
                                         [jonase/eastwood "0.3.4"]
                                         [com.livingsocial/lein-dependency-check "1.0.4"]]
                          :dependencies [[midje "1.9.6"]
                                         [ring/ring-mock "0.3.2"]]}
             :unit       {:jvm-opts ["-Dlogback.configurationFile=./test/logback-unit.xml"]}})
