(ns functional.settings-page
  (:require [clj-webdriver.taxi :refer :all]
            [functional.helpers :refer :all]))

(defn- checkbox [show q]
  (cond
    (and show (not (selected? q))) (click q)
    (and (not show) (selected? q)) (click q)))

(defn navigate [base-url]
  (click (locator "menu-settings"))
  (wait-until #(= (current-url) (str base-url "/settings"))))

(defn show-tray-names [show]
  (checkbox show (locator "show-tray-names")))

(defn show-build-times [show]
  (checkbox show (locator "show-build-times")))

(defn show-broken-build-times [show]
  (checkbox show (locator "show-broken-build-times")))

(defn play-broken-build-sounds [play]
  (checkbox play (locator "play-sounds")))

(defn show-build-labels [show]
  (checkbox show (locator "show-build-labels")))
