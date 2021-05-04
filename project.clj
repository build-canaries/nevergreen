(defproject nevergreen "0.0.0"
  :description "A build monitor with attitude"
  :url "https://github.com/build-canaries/nevergreen"
  ; use lein deps :tree to check dependency problems and actual versions used
  :dependencies [[org.clojure/clojure "1.10.3"]
                 [ring "1.9.3" :exclusions [org.eclipse.jetty/jetty-server]]
                 [org.eclipse.jetty/jetty-server "9.4.40.v20210413"]
                 [compojure "1.6.2" :exclusions [ring/ring-codec]]
                 [environ "1.2.0"]
                 [cheshire "5.10.0"]
                 [clj-cctray "2.0.0"]
                 ; commons-codec is excluded as ring pulls in a newer version
                 ; commons-io 2.6 has CVE-2021-29425, so exclude and explicitly use fixed version
                 [clj-http "3.12.1" :exclusions [commons-codec commons-io]]
                 [commons-io "2.7"] ; check if this is still required if clj-http is upgraded
                 [ring-curl "1.0.1"]
                 [ring/ring-json "0.5.1"]
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
  :source-paths ["src/server"]
  :test-paths ["src/server"]
  :jvm-opts ["-Dclojure.compiler.direct-linking=true"
             "-Dclojure.compiler.elide-meta=[:doc :file :line :added]"
             "--illegal-access=deny"]
  :aliases {"lint"          ["with-profile" "+test" "eastwood"]
            "coverage"      ["with-profile" "+test" "cloverage"]
            "check-updates" ["ancient" ":all"]
            "audit"         ["nvd" "check"]}
  :profiles {:dev  {:plugins [[lein-ancient "0.7.0"]
                              [jonase/eastwood "0.4.0"]
                              [lein-cloverage "1.2.2"]
                              [lein-nvd "1.4.1"]
                              [lein-eftest "0.5.9"]]}
             :test {:jvm-opts ["-Dlogback.configurationFile=./src/logback-tests.xml"]}}
  :cloverage {:output           "target/coverage-reports/server"
              :junit?           true
              :ns-exclude-regex [#"nevergreen\.logging" #".*-test"]}
  :nvd {:output-dir       "target/security-reports/server"
        :suppression-file "config/nvd-suppressions.xml"})
