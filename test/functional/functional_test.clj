(ns functional.functional-test
  (:require [clojure.test :refer :all]
            [clj-webdriver.taxi :refer :all]
            [clj-webdriver.driver :refer [init-driver]]
            [functional.helpers :refer :all]
            [functional.tracking-page :as tracking-page]
            [functional.monitor-page :as monitor-page]
            [functional.success-page :as success-page]
            [functional.settings-page :as settings-page]
            [functional.backup-page :as backup-page]
            [functional.help-page :as help-page]
            [clojure.java.io :refer [make-parents]]
            [environ.core :refer [env]])
  (import org.openqa.selenium.chrome.ChromeDriver
          org.openqa.selenium.firefox.FirefoxDriver
          org.openqa.selenium.Dimension
          io.github.bonigarcia.wdm.ChromeDriverManager
          io.github.bonigarcia.wdm.FirefoxDriverManager))

(def snap-ci-xvfb-size (Dimension. 1280 1024))
; (def full-hd-tv-size (Dimension. 1920 1080))
; (def hd-tv-size (Dimension. 1280 720))
; (def xbox-one-size (Dimension. 1236 701))

(def browser (browser-to-use))

(defn create-driver []
  (case browser
    :firefox (do (.setup (FirefoxDriverManager/getInstance))
                 (FirefoxDriver.))
    (do (.setup (ChromeDriverManager/getInstance))
        (ChromeDriver.))))

(defn functional-fixture [test-fn]
  (let [driver (create-driver)]
    (.. driver (manage) (window) (setSize snap-ci-xvfb-size))
    (set-driver! (init-driver {:webdriver driver})))

  (delete-all-cookies)
  (implicit-wait 1000)
  (test-fn)
  (quit))

(defn export-details [test-fn]
  (test-fn)
  (make-parents "./target/functional/screenshot.png")
  (take-screenshot :file (str "./target/functional/" (name browser) "-screenshot.png"))
  (spit (str "./target/functional/" (name browser) "-page-source.html") (page-source)))

(use-fixtures :once functional-fixture)
(use-fixtures :each export-details)

(def tray-name "some-tray-name")
(def success-message "some-message")
(def success-image "https://raw.githubusercontent.com/build-canaries/nevergreen/master/doc/screenshot.png")
(def expected-projects ["success building project", "failure sleeping project", "failure building project"])

(deftest complete-journey
  (let [base-url (nevergreen-under-test)
        tray-url (tray-url-to-fetch)
        tray-username (tray-username-to-use)
        tray-password (tray-password-to-use)]

    (to (str base-url))

    (tracking-page/navigate base-url)
    (let [tray (tracking-page/add-tray tray-url tray-username tray-password)]
      (tracking-page/include-all tray)
      (tracking-page/show-settings tray)
      (tracking-page/generate-random-name tray)
      (tracking-page/set-name tray tray-name)
      (tracking-page/show-projects tray))

    (success-page/navigate base-url)
    (success-page/add-message success-message)
    (success-page/add-message success-image)
    (is (in? (success-page/messages) success-message) "Expected success message not added")
    (is (in? (success-page/images) success-image) "Expected success image not added")

    (settings-page/navigate base-url)
    (doseq [state [true false]]
      (do (settings-page/show-tray-names state)
          (settings-page/show-broken-build-times state)
          (settings-page/play-broken-build-sounds state)
          (settings-page/show-build-labels state)))

    (backup-page/navigate base-url)
    (-> (backup-page/export-data)
        (backup-page/import-data))

    (help-page/navigate base-url)

    (monitor-page/navigate base-url)
    (doseq [actual-project (monitor-page/interesting-projects)]
      (is (element-includes? expected-projects actual-project) "Expected project not displayed"))))
