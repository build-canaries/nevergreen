(ns functional.helpers
  (:require [environ.core :refer [env]]
            [clj-webdriver.taxi :refer :all]
            [clojure.string :as s]
            [clojure.tools.logging :as log]
            [clojure.java.io :refer [make-parents]]))

(defn in? [seq elm]
  (some #(= elm %) seq))

(defn element-includes? [seq elm]
  (some #(s/includes? elm %) seq))

(defn nevergreen-under-test []
  (let [url (or (env :functional-url) "http://localhost:5000")]
    (log/info "Running against" url)
    url))

(defn tray-url-to-fetch []
  (let [url (or (env :tray-url) "http://localhost:5050/secure/cctray.xml")]
    (log/info "Using tray url" url)
    url))

(defn tray-username-to-use []
  (let [username (or (env :tray-username) "u")]
    (log/info "Using tray username" username)
    username))

(defn browser-to-use []
  (let [browser (or (keyword (env :browser)) :chrome)]
    (log/info "Using browser" browser)
    browser))

(defn tray-password-to-use []
  (let [password (or (env :tray-password) "p")]
    (log/info "Using tray password" password)
    password))

(defn expected-version []
  (env :full-version))

(defn input [q val]
  (clear q)
  (input-text q val))

(defn locator [q]
  (str "[data-locator='" q "']"))

(defn- log-level [level]
  (cond
    (= level "SEVERE") :error
    (= level "WARNING") :warn
    (= level "INFO") :info
    (= level "FINE") :trace
    (= level "FINER") :trace
    (= level "FINEST") :trace
    :else :off))

(defn print-logs [driver type]
  (doseq
    [log (.. driver (manage) (logs) (get type))]
    (log/log
      (log-level (.. log (getLevel) (toString)))
      (str
        (.getTimestamp log)
        " "
        (-> (.getMessage log)
            (s/trim-newline)
            (s/replace "\\n" "\n")
            (s/replace "\\u003C" "<"))))))

(defn save-screenshot-and-source [filename]
  (let [basePath "./target/functional/"
        browser (name (browser-to-use))]
    (make-parents (str basePath filename ".png"))
    (take-screenshot :file (str basePath browser "-" filename ".png"))
    (spit (str basePath browser "-" filename ".html") (page-source))))
