(ns functional.audio-visual-page
  (:require [clj-webdriver.taxi :refer :all]
            [functional.helpers :refer :all]))

(defn- checkbox [show q]
  (cond
    (and show (not (selected? q))) (click q)
    (and (not show) (selected? q)) (click q)))

(defn navigate [base-url]
  (click (locator "menu-audio-visual"))
  (wait-until #(= (current-url) (str base-url "/audio-visual"))))

(defn show-names [show]
  (checkbox show (locator "show-names")))

(defn show-times [show]
  (checkbox show (locator "show-times")))

(defn play-sounds [play]
  (checkbox play (locator "play-sounds")))
