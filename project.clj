(defproject nevergreen "1.0.0"
  :description "A build monitor with attitude"
  :url "https://github.com/build-canaries/nevergreen"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [ring "1.5.1"]
                 [compojure "1.5.2"]
                 [environ "1.1.0"]
                 [cheshire "5.7.0"]
                 [clj-cctray "0.11.0"]
                 [clj-http "3.5.0"]
                 [ring-curl "0.3.0"]
                 [ring/ring-json "0.4.0"]
                 [ring/ring-defaults "0.2.3"]
                 [bk/ring-gzip "0.2.1"]
                 [ring-basic-authentication "1.0.5"]
                 [base64-clj "0.1.1"]
                 [camel-snake-kebab "0.4.0"]
                 [http-kit "2.2.0"]
                 [org.slf4j/slf4j-simple "1.7.25"]
                 [org.slf4j/log4j-over-slf4j "1.7.25"]
                 [org.slf4j/jul-to-slf4j "1.7.25"]
                 [org.slf4j/jcl-over-slf4j "1.7.25"]]
  :plugins [[lein-ring "0.10.0"]]
  :min-lein-version "2.0.0"
  :ring {:handler nevergreen.app/all-routes :port 5000}
  :uberjar-name "nevergreen-standalone.jar"
  :main nevergreen.app
  :aot [nevergreen.app]
  :javac-options ["-Dclojure.compiler.direct-linking=true"]
  :profiles {:dev {:plugins      [[lein-midje "3.2.1"]]
                   :dependencies [[midje "1.8.3"]
                                  [org.seleniumhq.selenium/selenium-support "3.3.1"]
                                  [org.seleniumhq.selenium/selenium-java "3.3.1" :exclusions [org.seleniumhq.selenium/selenium-support
                                                                                              org.eclipse.jetty/jetty-io
                                                                                              org.eclipse.jetty/jetty-util]]
                                  [clj-webdriver/clj-webdriver "0.7.2"]
                                  [io.github.bonigarcia/webdrivermanager "1.6.2" :exclusions [com.google.guava/guava
                                                                                              org.apache.commons/commons-lang3]]
                                  [ring/ring-mock "0.3.0"]]}})
