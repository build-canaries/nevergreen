(ns functional.backup-page
  (:require [clj-webdriver.taxi :refer :all]
            [functional.helpers :refer :all]))

(defn navigate [base-url]
  (click (locator "menu-backup"))
  (wait-until #(= (current-url) (str base-url "/backup"))))

(defn export []
  (attribute (locator "export-data") :value))

(defn import [data]
  (input (locator "import-data") data)
  (click (locator "import")))
