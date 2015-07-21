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

(def snap-ci-xvfb-size (Dimension. 1280 1024))
(def full-hd-tv-size (Dimension. 1920 1080))
(def hd-tv-size (Dimension. 1280 720))

(defn functional-fixture [test-fn]
  (let [driver (ChromeDriver.)]
    (.. driver (manage) (window) (setSize snap-ci-xvfb-size))
    (set-driver! (init-driver {:webdriver driver})))

  (test-fn)

  (quit))

(defn details-on-failure [test-fn]
  (test-fn)

  (take-screenshot :file "./target/functional-test.png")
  (spit "./target/functional-test.html" (page-source)))

(use-fixtures :once functional-fixture)
(use-fixtures :each details-on-failure)

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

    (wait-until #(exists? ".testing-projects"))

    (click ".testing-include-all")
    (click "#monitor")

    (wait-until #(exists? "#interesting-projects"))

    (let [actual-project-list (elements "#interesting-projects > li")]
      (is (= (count expected-projects) (count actual-project-list)) "Incorrect amount of projects displayed"))

    (doseq [actual-project (elements "#interesting-projects > li > div > div")]
      (is (in? expected-projects (text actual-project)) "Expected project not displayed"))))
