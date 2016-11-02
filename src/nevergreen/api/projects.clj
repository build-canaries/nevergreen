(ns nevergreen.api.projects
  (:require [clj-cctray.core :as parser]
            [clj-cctray.filtering :as filtering]
            [clj-cctray.util :refer [in?]]
            [clojure.string :refer [blank? replace]]
            [nevergreen.http :refer [http-get]]
            [nevergreen.servers :as servers]
            [nevergreen.security :as security]
            [nevergreen.crypto :as crypt])
  (:refer-clojure :exclude [replace]))

(defn- replace-build-labels [webUrl]
  (replace webUrl #"\/\d+(?:\/|$)" "/0/"))

(defn invalid-scheme? [url]
  (or (blank? url)
      (not (re-find #"https?://" url))))

(defn filter-by-urls [urls projects]
  (filter #(in? urls (replace-build-labels (:web-url %))) projects))

(defn- invalid-url-error-message [url]
  (if (blank? url)
    "URL was blank! A http(s) URL must be provided."
    (str "Only http(s) URLs are supported: " url)))

(defn- ensure-url-is-valid [{:keys [url]}]
  (if (invalid-scheme? url)
    (let [msg (invalid-url-error-message url)]
      (throw (ex-info msg {:status 422 :message msg :url url})))))

(defn- set-auth-header [username password]
  (if-not (or (blank? username) (blank? password))
    (security/basic-auth-header username password)))

(defn get-server-type [{:keys [serverType url]}]
  (let [server-type (keyword serverType)]
    (if (servers/unknown-server? server-type)
      (servers/detect-server url)
      server-type)))

(defn- add-tray-id [tray-id projects]
  (map #(merge {:tray-id tray-id} %) projects))

(defn fetch-tray [tray]
  (ensure-url-is-valid tray)
  (let [server-type (get-server-type tray)
        decrypted-password (if-not (blank? (:password tray)) (crypt/decrypt (:password tray)))]
    (->>
      (parser/get-projects
        (http-get (:url tray) (set-auth-header (:username tray) decrypted-password))
        {:normalise true :server server-type}))))

(defn get-all [trays]
  (if (= (count trays) 1)
    (fetch-tray (first trays))
    (flatten (pmap fetch-tray trays))))

(defn fetch-interesting [tray]
  (->> (fetch-tray tray)
       (filtering/interesting)
       (filter-by-urls (:included tray))
       (add-tray-id (:tray-id tray))))

(defn get-interesting [trays]
  (if (= (count trays) 1)
    (fetch-interesting (first trays))
    (flatten (pmap fetch-interesting trays))))
