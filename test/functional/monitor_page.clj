(ns functional.monitor-page
  (:require [clj-webdriver.taxi :refer :all]
            [functional.helpers :refer :all]))

(defn navigate [base-url]
  (click (locator "menu-monitor"))
  (wait-until #(= (current-url) (str base-url "/monitor"))))

(defn interesting-projects []
  (wait-until #(present? (locator "interesting-projects")))
  (map text (elements (locator "interesting-project"))))
