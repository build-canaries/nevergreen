(ns functional.tracking-page
  (:require [clj-webdriver.taxi :refer :all]
            [functional.helpers :refer :all]))

(defn- wait-for-projects [tray]
  (wait-until #(present? (find-element-under tray {:css (locator "available-projects")}))))

(defn navigate [base-url]
  (click (locator "menu-tracking"))
  (wait-until #(= (current-url) (str base-url "/tracking"))))

(defn add-tray [url username password]
  (let [added-trays (count (elements (locator "tray")))]
    (input (locator "add-tray-url") url)
    (input (locator "add-tray-username") username)
    (input (locator "add-tray-password") password)
    (click (locator "add-tray"))
    (wait-until #(> (count (elements (locator "tray"))) added-trays)))
  (last (elements (locator "tray"))))

(defn include-all [tray]
  (wait-for-projects tray)
  (click (find-element-under tray {:css (locator "include-all")})))

(defn show-settings [tray]
  (click (find-element-under tray {:css (locator "tab-settings")}))
  (wait-until #(present? (find-element-under tray {:css (locator "tray-settings")}))))

(defn generate-random-name [tray]
  (click (find-element-under tray {:css (locator "generate-random")})))

(defn set-name [tray name]
  (input (find-element-under tray {:css (locator "tray-name")}) name))

(defn show-projects [tray]
  (click (find-element-under tray {:css (locator "tab-projects")}))
  (wait-for-projects tray))

(defn get-tray []
  (last (elements (locator "tray"))))
