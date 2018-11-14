(ns functional.functional-test
  (:require [clojure.test :refer :all]
            [clj-webdriver.taxi :refer :all]
            [clj-webdriver.driver :refer [init-driver]]
            [functional.setup :refer [create-driver]]
            [functional.helpers :refer :all]
            [functional.version :refer :all]
            [functional.tracking-page :as tracking-page]
            [functional.monitor-page :as monitor-page]
            [functional.success-page :as success-page]
            [functional.settings-page :as settings-page]
            [functional.backup-page :as backup-page]
            [functional.help-page :as help-page])
  (:import org.openqa.selenium.Dimension
           org.openqa.selenium.logging.LogType))

(def driver-atom (atom nil))

; (def ^:private full-hd-tv-size (Dimension. 1920 1080))
(def ^:private hd-tv-size (Dimension. 1280 720))
; (def ^:private xbox-one-size (Dimension. 1236 701))

(defn functional-fixture [test-fn]
  (let [driver (create-driver)]
    (set-driver! (init-driver {:webdriver driver}))
    (compare-and-set! driver-atom nil driver))

  (implicit-wait 2000)

  (test-fn)

  (quit))

(defn before-after-each-fixture [test-fn]
  (.. @driver-atom (manage) (window) (setSize hd-tv-size))
  (delete-all-cookies)

  (test-fn)

  (print-logs @driver-atom LogType/DRIVER)
  (print-logs @driver-atom LogType/BROWSER))

(use-fixtures :once functional-fixture)
(use-fixtures :each before-after-each-fixture)

(def ^:private tray-name "some-tray-name")
(def ^:private success-message "some-message")
(def ^:private success-image "https://raw.githubusercontent.com/build-canaries/nevergreen/master/doc/screenshot.png")
(def ^:private expected-projects ["success building project", "failure sleeping project", "failure building project"])

(deftest complete-journey
  (let [base-url (nevergreen-under-test)
        tray-url (tray-url-to-fetch)
        tray-username (tray-username-to-use)
        tray-password (tray-password-to-use)]

    (to (str base-url))

    (save-screenshot-and-source "home")

    (is (= (expected-version) (version)))

    (tracking-page/navigate base-url)
    (let [tray (tracking-page/add-tray tray-url tray-username tray-password)]
      (tracking-page/include-all tray)
      (tracking-page/show-settings tray)
      (tracking-page/generate-random-name tray)
      (tracking-page/set-name tray tray-name)
      (tracking-page/show-projects tray))

    (save-screenshot-and-source "tracking")

    ; test settings aren't reset when we refresh the page
    (refresh)
    (let [tray (tracking-page/get-tray)]
      (tracking-page/show-projects tray))

    (save-screenshot-and-source "tracking-refresh")

    (success-page/navigate base-url)
    (success-page/add-message success-message)
    (success-page/add-message success-image)

    (save-screenshot-and-source "success")

    (is (in? (success-page/messages) success-message) "Expected success message not added")
    (is (in? (success-page/images) success-image) "Expected success image not added")

    (settings-page/navigate base-url)
    (doseq [state [true false]]
      (do (settings-page/show-tray-names state)
          (settings-page/show-build-times state)
          (settings-page/show-broken-build-times state)
          (settings-page/play-broken-build-sounds state)
          (settings-page/show-build-labels state)
          (settings-page/click-to-show-menu state)))

    (save-screenshot-and-source "settings")

    (backup-page/navigate base-url)
    ;(-> (backup-page/export-data)
    ;    (backup-page/import-data))

    (save-screenshot-and-source "backup")

    (help-page/navigate base-url)

    (save-screenshot-and-source "help")

    (monitor-page/navigate base-url)

    (save-screenshot-and-source "monitor")

    (doseq [actual-project (monitor-page/interesting-projects)]
      (is (element-includes? expected-projects actual-project) "Expected project not displayed"))))
