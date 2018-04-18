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
           io.github.bonigarcia.wdm.ChromeDriverManager
           io.github.bonigarcia.wdm.FirefoxDriverManager))

(defn create-driver []
  (case (browser-to-use)
    :firefox (do (.setup (FirefoxDriverManager/getInstance))
                 (FirefoxDriver.))
    (do (.setup (ChromeDriverManager/getInstance))
        (let [options (ChromeOptions.)
              loggingPrefs (LoggingPreferences.)]
          (do
            (.enable loggingPrefs LogType/DRIVER Level/ALL)
            (.setCapability options CapabilityType/LOGGING_PREFS loggingPrefs)
            (.setHeadless options true)
            (ChromeDriver. options))))))
