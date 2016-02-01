(ns functional.functional-test
  (:require [clojure.test :refer :all]
            [clj-webdriver.taxi :refer :all]
            [clj-webdriver.driver :refer [init-driver]]
            [environ.core :refer [env]]
            [functional.helpers :refer :all])
  (import org.openqa.selenium.chrome.ChromeDriver
          org.openqa.selenium.Dimension))

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

(def expected-projects ["success building project", "failure sleeping project", "failure building project"])

(deftest simple-journey
  (let [base-url (nevergreen-under-test)
        tray-url (tray-url-to-fetch)
        tray-username (tray-username-to-use)
        tray-password (tray-password-to-use)]
    (to (str base-url "/tracking"))

    (input "#cctray-url" tray-url)
    (input "#username" tray-username)
    (input "#password" tray-password)
    (click "#cctray-fetch")

    (wait-until #(visible? ".testing-projects"))

    (click ".testing-include-all")
    (click "#monitor")

    (wait-until #(visible? "#interesting-projects"))

    (let [actual-project-list (elements "#interesting-projects > li")]
      (is (= (count expected-projects) (count actual-project-list)) "Incorrect amount of projects displayed"))

    (doseq [actual-project (elements "#interesting-projects > li > div > div > span.monitor-project-name")]
      (is (in? expected-projects (text actual-project)) "Expected project not displayed"))))
