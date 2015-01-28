(ns functional.functional-test
  (:require [clojure.test :refer :all]
            [clj-webdriver.taxi :refer :all]
            [clj-webdriver.driver :refer [init-driver]]
            [environ.core :refer [env]])
  (import org.openqa.selenium.phantomjs.PhantomJSDriver
          org.openqa.selenium.Dimension))

(defn in? [seq elm]
  (some #(= elm %) seq))

(def hd-tv-size (Dimension. 1920 1080))

(defn functional-fixture [test-fn]
  (let [driver (PhantomJSDriver.)]
    (.. driver (manage) (window) (setSize hd-tv-size))
    (set-driver! (init-driver {:webdriver driver})))

  (test-fn)

  (take-screenshot :file "./target/functional-test.png")
  (quit))

(use-fixtures :once functional-fixture)

(defn nevergreen-under-test []
  (let [url (or (env :functional-url) "http://localhost:5000/config")]
    (println "Running agaisnt" url)
    url))

(def expected-projects ["success building project", "failure sleeping project", "failure building project"])

(deftest simple-journey
  (to (nevergreen-under-test))

  (clear "#cctray-url")
  (input-text "#cctray-url" "http://localhost:5000/test_data.xml")
  (click "#cctray-fetch")

  (wait-until #(exists? "#projects > p > label > input"))

  (click "#include-all")
  (click "#monitor")

  (wait-until #(= (title) "Nevergreen"))

  (doseq [actual-project (elements "#projects > li > div > div")]
    (is (in? expected-projects (text actual-project)) "Expected project not displayed")))
