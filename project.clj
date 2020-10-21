(defproject nevergreen "0.0.0"
  :description "A build monitor with attitude"
  :url "https://github.com/build-canaries/nevergreen"
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [ring "1.8.2" :exclusions [org.eclipse.jetty/jetty-server]]
                 [org.eclipse.jetty/jetty-server "9.4.32.v20200930"]
                 [compojure "1.6.2" :exclusions [ring/ring-codec]]
                 [environ "1.2.0"]
                 [cheshire "5.10.0"]
                 [clj-cctray "2.0.0"]
                 [clj-http "3.10.3"]
                 [ring-curl "1.0.1"]
                 [ring/ring-json "0.5.0"]
                 [ring/ring-defaults "0.3.2"]
                 [bk/ring-gzip "0.3.0"]
                 [ring-basic-authentication "1.1.0"]
                 [base64-clj "0.1.1"]
                 [camel-snake-kebab "0.4.2"]
                 [com.cemerick/url "0.1.1" :exclusions [com.cemerick/clojurescript.test]]
                 [ch.qos.logback/logback-classic "1.2.3" :exclusions [org.slf4j/slf4j-api]]
                 [org.slf4j/log4j-over-slf4j "1.7.30"]
                 [org.slf4j/jul-to-slf4j "1.7.30"]
                 [org.slf4j/jcl-over-slf4j "1.7.30"]]
  :min-lein-version "2.0.0"
  :uberjar-name "nevergreen-standalone.jar"
  :main nevergreen.app
  :aot [nevergreen.app]
  :jvm-opts ["-Dclojure.compiler.direct-linking=true"
             "-Dclojure.compiler.elide-meta=[:doc :file :line :added]"
             "--illegal-access=deny"]
  :aliases {"lint"          ["with-profile" "+test" "eastwood"]
            "coverage"      ["with-profile" "+test" "cloverage"]
            "check-updates" ["ancient" ":all"]
            "audit"         ["nvd" "check"]}
  :profiles {:dev  {:plugins [[lein-ancient "0.6.15"]
                              [jonase/eastwood "0.3.11"]
                              [lein-cloverage "1.2.1"]
                              [lein-nvd "1.4.1"]
                              [lein-eftest "0.5.9"]]}
             :test {:jvm-opts ["-Dlogback.configurationFile=./test/logback-unit.xml"]}}
  :cloverage {:output           "target/coverage-reports/server"
              :junit?           true
              :ns-exclude-regex [#"nevergreen\.logging"]}
  :nvd {:output-dir       "target/security-reports/server"
        :suppression-file "config/nvd-suppressions.xml"})
