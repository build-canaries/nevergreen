(defproject nevergreen "0.0.0"
  :description "A build monitor with attitude"
  :url "https://github.com/build-canaries/nevergreen"
  ; use lein deps :tree to check dependency problems and actual versions used
  :dependencies [[org.clojure/clojure "1.12.0"]
                 [ring "1.13.0"]
                 [compojure "1.7.1" :exclusions [ring/ring-codec]]
                 [environ "1.2.0"]
                 [cheshire "5.13.0"]
                 [clj-cctray "2.1.1"]
                 ; commons-* are excluded as ring pulls in newer versions
                 [clj-http "3.13.0" :exclusions [commons-codec commons-io]]
                 [ring-curl "1.0.1"]
                 [ring/ring-json "0.5.1"]
                 [ring/ring-defaults "0.5.0"]
                 [bk/ring-gzip "0.3.0"]
                 [ring-basic-authentication "1.2.0"]
                 [base64-clj "0.1.1"]
                 [camel-snake-kebab "0.4.3"]
                 [com.cemerick/url "0.1.1" :exclusions [com.cemerick/clojurescript.test]]
                 [ch.qos.logback/logback-classic "1.5.15" :exclusions [org.slf4j/slf4j-api]]
                 [org.slf4j/log4j-over-slf4j "2.0.16"]
                 [org.slf4j/jul-to-slf4j "2.0.16"]
                 [org.slf4j/jcl-over-slf4j "2.0.16"]]
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
                              [jonase/eastwood "1.4.3"]
                              [lein-cloverage "1.2.4"]]}
             :test {:jvm-opts ["-Dlogback.configurationFile=./src/logback-tests.xml"]}}
  :cloverage {:output           "target/coverage-reports/server"
              :junit?           true
              :ns-exclude-regex [#"nevergreen\.logging" #".*-test"]})
