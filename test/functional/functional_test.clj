(ns functional.functional-test
  (:require [clojure.test :refer :all]
            [clj-webdriver.taxi :refer :all]
            [clj-webdriver.driver :refer [init-driver]]
            [environ.core :refer [env]])
  (import org.openqa.selenium.phantomjs.PhantomJSDriver
          org.openqa.selenium.chrome.ChromeDriver
          org.openqa.selenium.Dimension))

(defn in? [seq elm]
  (some #(= elm %) seq))

(def hd-tv-size (Dimension. 1280 1024))

(defn functional-fixture [test-fn]
  (let [driver (ChromeDriver.)]
    (.. driver (manage) (window) (setSize hd-tv-size))
    (set-driver! (init-driver {:webdriver driver})))

  (test-fn)

  (take-screenshot :file "./target/functional-test.png")
  (quit))

(use-fixtures :once functional-fixture)

(defn nevergreen-under-test []
  (let [url (or (env :functional-url) "http://localhost:5000")]
    (println "Running agaisnt" url)
    url))

(def expected-projects ["success building project", "failure sleeping project", "failure building project"])

(deftest simple-journey
  (let [base-url (nevergreen-under-test)]
    (to (str base-url "/#/tracking"))

    (clear "#cctray-url")
    (input-text "#cctray-url" (str base-url "/test_data.xml"))
    (click "#cctray-fetch")

    (wait-until #(exists? "#projects"))

    (click "#include-all")
    (click "#monitor")

    (wait-until #(exists? "#interesting-projects"))

    (doseq [actual-project (elements "#interesting-projects > li > div > div")]
      (is (in? expected-projects (text actual-project)) "Expected project not displayed"))))
