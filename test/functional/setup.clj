(ns functional.setup
  (:require [clj-webdriver.driver :refer [init-driver]]
            [functional.helpers :refer [browser-to-use]])
  (:import org.openqa.selenium.chrome.ChromeDriver
           org.openqa.selenium.chrome.ChromeOptions
           org.openqa.selenium.firefox.FirefoxDriver
           java.util.logging.Level
           org.openqa.selenium.remote.CapabilityType
           org.openqa.selenium.logging.LogType
           org.openqa.selenium.logging.LoggingPreferences
           io.github.bonigarcia.wdm.WebDriverManager))

(defn create-driver []
  (case (browser-to-use)
    :firefox (do (.setup (WebDriverManager/firefoxdriver))
                 (FirefoxDriver.))
    (do (.. (WebDriverManager/chromedriver) (version "2.43") (setup))
        (let [options (ChromeOptions.)
              loggingPrefs (LoggingPreferences.)]
          (do
            (.enable loggingPrefs LogType/DRIVER Level/ALL)
            (.setCapability options CapabilityType/LOGGING_PREFS loggingPrefs)
            (.setHeadless options true)
            (ChromeDriver. options))))))
