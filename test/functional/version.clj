(ns functional.version
  (:require [clj-webdriver.taxi :refer :all]
            [functional.helpers :refer :all]))

(defn version []
  (text (locator "version")))
