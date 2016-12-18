(ns functional.help-page
  (:require [clj-webdriver.taxi :refer :all]
            [functional.helpers :refer :all]))

(defn navigate [base-url]
  (click (locator "menu-help"))
  (wait-until #(= (current-url) (str base-url "/help"))))
