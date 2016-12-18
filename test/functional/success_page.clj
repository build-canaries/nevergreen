(ns functional.success-page
  (:require [clj-webdriver.taxi :refer :all]
            [functional.helpers :refer :all]))

(defn navigate [base-url]
  (click (locator "menu-success"))
  (wait-until #(= (current-url) (str base-url "/success"))))

(defn add-message [m]
  (input (locator "message") m)
  (click (locator "add-message")))

(defn messages []
  (map text (elements (locator "success-message"))))

(defn images []
  (map #(attribute % :src) (elements (locator "success-image"))))
