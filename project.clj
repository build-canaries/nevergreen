(defproject nevergreen "0.0.0"
  :description "A build monitor with attitude"
  :url "https://github.com/build-canaries/nevergreen"
  ; use lein deps :tree to check dependency problems and actual versions used
  :dependencies [[org.clojure/clojure "1.11.1"]
                 [ring "1.9.6" :exclusions [org.eclipse.jetty/jetty-server]]
                 [org.eclipse.jetty/jetty-server "9.4.49.v20220914"]
                 [compojure "1.7.0" :exclusions [ring/ring-codec]]
                 [environ "1.2.0"]
                 [cheshire "5.11.0"]
                 [clj-cctray "2.1.1"]
                 ; commons-* are excluded as ring pulls in newer versions
                 [clj-http "3.12.3" :exclusions [commons-codec commons-io]]
                 [ring-curl "1.0.1"]
                 [ring/ring-json "0.5.1"]
                 [ring/ring-defaults "0.3.4"]
                 [bk/ring-gzip "0.3.0"]
                 [ring-basic-authentication "1.1.1"]
                 [base64-clj "0.1.1"]
                 [camel-snake-kebab "0.4.3"]
                 [com.cemerick/url "0.1.1" :exclusions [com.cemerick/clojurescript.test]]
                 [ch.qos.logback/logback-classic "1.4.4" :exclusions [org.slf4j/slf4j-api]]
                 [org.slf4j/log4j-over-slf4j "2.0.3"]
                 [org.slf4j/jul-to-slf4j "2.0.3"]
                 [org.slf4j/jcl-over-slf4j "2.0.3"]]
  :min-lein-version "2.0.0"
  :uberjar-name "nevergreen-standalone.jar"
  :main nevergreen.app
  :aot [nevergreen.app]
  :source-paths ["src/server"]
  :test-paths ["src/server"]
  :jvm-opts ["-Dclojure.compiler.direct-linking=true"
             "-Dclojure.compiler.elide-meta=[:doc :file :line :added]"]
  :aliases {"lint"          ["with-profile" "+test" "eastwood"]
            "coverage"      ["with-profile" "+test" "cloverage"]
            "check-updates" ["ancient" ":all"]}
  :profiles {:dev  {:plugins [[lein-ancient "0.7.0"]
                              [jonase/eastwood "1.3.0"]
                              [lein-cloverage "1.2.4"]]}
             :test {:jvm-opts ["-Dlogback.configurationFile=./src/logback-tests.xml"]}}
  :cloverage {:output           "target/coverage-reports/server"
              :junit?           true
              :ns-exclude-regex [#"nevergreen\.logging" #".*-test"]})
