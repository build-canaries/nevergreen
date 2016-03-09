(defproject nevergreen "0.0.0"
  :description "A build monitor with attitude"
  :url "https://github.com/build-canaries/nevergreen"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [ring "1.4.0"]
                 [compojure "1.4.0"]
                 [environ "1.0.2"]
                 [cheshire "5.5.0"]
                 [clj-cctray "0.9.1"]
                 [clj-http "2.1.0"]
                 [ring-curl "0.3.0"]
                 [ring/ring-json "0.4.0"]
                 [ring/ring-defaults "0.1.5"]
                 [bk/ring-gzip "0.1.1"]
                 [ring-basic-authentication "1.0.5"]
                 [base64-clj "0.1.1"]
                 [camel-snake-kebab "0.3.2"]
                 [http-kit "2.1.19"]]
  :plugins [[lein-ring "0.9.7"]
            [lein-environ "1.0.2"]]
  :min-lein-version "2.0.0"
  :ring {:handler nevergreen.app/all-routes :port 5000}
  :uberjar-name "nevergreen-standalone.jar"
  :main nevergreen.app
  :aot [nevergreen.app]
  :javac-options ["-Dclojure.compiler.direct-linking=true"]
  :profiles {:dev        {:plugins      [[lein-midje "3.2"]
                                         [lein-ancient "0.6.8"]
                                         [lein-idea "1.0.1"]]
                          :dependencies [[midje "1.8.3"]
                                         [clj-webdriver/clj-webdriver "0.7.2"]
                                         [com.github.detro/phantomjsdriver "1.2.0"]
                                         [ring/ring-mock "0.3.0"]]}
             :production {:env {:production true}}})
