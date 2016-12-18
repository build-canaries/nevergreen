(ns functional.helpers
  (:require [environ.core :refer [env]]
            [clj-webdriver.taxi :refer :all]
            [clojure.string :as s]))

(defn in? [seq elm]
  (some #(= elm %) seq))

(defn element-includes? [seq elm]
  (some #(s/includes? elm %) seq))

(defn nevergreen-under-test []
  (let [url (or (env :functional-url) "http://localhost:5000")]
    (println "Running against" url)
    url))

(defn tray-url-to-fetch []
  (let [url (or (env :tray-url) "http://localhost:5050/secure/cctray.xml")]
    (println "Using tray url" url)
    url))

(defn tray-username-to-use []
  (let [username (or (env :tray-username) "u")]
    (println "Using tray username" username)
    username))

(defn tray-password-to-use []
  (let [password (or (env :tray-password) "p")]
    (println "Using tray password" password)
    password))

(defn input [q val]
  (clear q)
  (input-text q val))

(defn locator [q]
  (str "[data-locator='" q "']"))
