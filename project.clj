(defproject nevergreen "0.0.0"
  :description "A build monitor with attitude"
  :url "https://github.com/build-canaries/nevergreen"
  :dependencies [[org.clojure/clojure "1.9.0"]
                 [ring "1.6.3" :exclusions [org.eclipse.jetty/jetty-server]]
                 [org.eclipse.jetty/jetty-server "9.4.10.RC0"]
                 [compojure "1.6.1"]
                 [environ "1.1.0"]
                 [cheshire "5.8.0"]
                 [clj-cctray "1.0.0"]
                 [clj-http "3.8.0"]
                 [ring-curl "0.3.1"]
                 [ring/ring-json "0.4.0"]
                 [ring/ring-defaults "0.3.1"]
                 [bk/ring-gzip "0.3.0"]
                 [ring-basic-authentication "1.0.5"]
                 [base64-clj "0.1.1"]
                 [camel-snake-kebab "0.4.0"]
                 [com.cemerick/url "0.1.1"]
                 [ch.qos.logback/logback-classic "1.2.3"]
                 [org.slf4j/log4j-over-slf4j "1.7.25"]
                 [org.slf4j/jul-to-slf4j "1.7.25"]
                 [org.slf4j/jcl-over-slf4j "1.7.25"]]
  :min-lein-version "2.0.0"
  :uberjar-name "nevergreen-standalone.jar"
  :main nevergreen.app
  :aot [nevergreen.app]
  :javac-options ["-Dclojure.compiler.direct-linking=true"]
  :aliases {"unit"       ["with-profile" "+unit" "midje" "nevergreen.*"]
            "lint"       ["with-profile" "+unit" "eastwood"]
            "functional" ["with-profile" "+functional" "test" "functional.functional-test"]}
  :profiles {:dev        {:plugins      [[lein-midje "3.2.1"]
                                         [jonase/eastwood "0.2.5"]]
                          :dependencies [[midje "1.9.1"]
                                         [clj-webdriver/clj-webdriver "0.7.2" :exclusions [org.mortbay.jetty/jetty]]
                                         [org.seleniumhq.selenium/selenium-java "3.11.0" :exclusions [org.eclipse.jetty/jetty-io
                                                                                                      commons-logging]]
                                         [io.github.bonigarcia/webdrivermanager "2.2.1" :exclusions [org.apache.commons/commons-lang3]]
                                         [org.seleniumhq.selenium/htmlunit-driver "2.30.0" :exclusions [org.eclipse.jetty/jetty-io
                                                                                                        org.eclipse.jetty/jetty-http]]
                                         [ring/ring-mock "0.3.2"]]}
             :unit       {:jvm-opts ["-Dlogback.configurationFile=./test/logback-unit.xml"]}
             :functional {:jvm-opts ["-Dlogback.configurationFile=./test/logback-functional.xml"]}})
