(defproject nevergreen "1.0.0"
  :description "A build monitor with attitude"
  :url "https://github.com/build-canaries/nevergreen"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [ring "1.6.3"]
                 [compojure "1.6.0"]
                 [environ "1.1.0"]
                 [cheshire "5.8.0"]
                 [clj-cctray "1.0.0"]
                 [clj-http "3.7.0"]
                 [ring-curl "0.3.1"]
                 [ring/ring-json "0.4.0"]
                 [ring/ring-defaults "0.3.1"]
                 [bk/ring-gzip "0.2.1"]
                 [ring-basic-authentication "1.0.5"]
                 [base64-clj "0.1.1"]
                 [camel-snake-kebab "0.4.0"]
                 [org.slf4j/slf4j-simple "1.7.25"]
                 [org.slf4j/log4j-over-slf4j "1.7.25"]
                 [org.slf4j/jul-to-slf4j "1.7.25"]
                 [org.slf4j/jcl-over-slf4j "1.7.25"]]
  :min-lein-version "2.0.0"
  :uberjar-name "nevergreen-standalone.jar"
  :main nevergreen.app
  :aot [nevergreen.app]
  :javac-options ["-Dclojure.compiler.direct-linking=true"]
  :profiles {:dev {:plugins      [[lein-midje "3.2.1"]]
                   :dependencies [[midje "1.9.1"]
                                  [org.seleniumhq.selenium/selenium-support "3.4.0"]
                                  [org.seleniumhq.selenium/selenium-java "3.4.0" :exclusions [org.seleniumhq.selenium/selenium-support
                                                                                              org.seleniumhq.selenium/selenium-api
                                                                                              org.eclipse.jetty/jetty-io
                                                                                              org.eclipse.jetty/jetty-util]]
                                  [clj-webdriver/clj-webdriver "0.7.2"]
                                  [io.github.bonigarcia/webdrivermanager "2.0.1" :exclusions [com.google.guava/guava
                                                                                              org.apache.commons/commons-lang3]]
                                  [ring/ring-mock "0.3.2"]]}})
