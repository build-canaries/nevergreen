(ns nevergreen.api.projects
  (:require [clj-cctray.core :as parser]
            [clj-cctray.filtering :as filtering]
            [clj-cctray.util :refer [in?]]
            [clojure.string :refer [join blank? replace]]
            [nevergreen.http :refer [http-get]]
            [nevergreen.servers :as servers]
            [nevergreen.security :as security]
            [nevergreen.crypto :as crypt]
            [nevergreen.errors :refer [create-error is-error?]])
  (:refer-clojure :exclude [replace])
  (:import (clojure.lang ExceptionInfo)))

(defn- invalid-url-error-message [url]
  (if (blank? url)
    "URL was blank! A http(s) URL must be provided."
    (str "Only http(s) URLs are supported: " url)))

(defn validate-scheme [{:keys [url]}]
  (if (or (blank? url)
          (not (re-find #"https?://" url)))
    (throw (ex-info (invalid-url-error-message url) {}))))

(defn- generate-project-id [project]
  (join "/" (remove nil? (map project [:unnormalised-owner :unnormalised-name :unnormalised-stage :unnormalised-job]))))

(defn- add-project-ids [projects]
  (map #(assoc % :project-id (generate-project-id %)) projects))

(defn- add-server-type [server-type projects]
  (map #(assoc % :server-type server-type) projects))

(defn filter-by-ids [ids projects]
  (filter #(in? ids (:project-id %)) projects))

(defn- set-auth-header [username password]
  (if-not (or (blank? username) (blank? password))
    (security/basic-auth-header username password)))

(defn get-server-type [{:keys [server-type url]}]
  (let [server-keyword (keyword server-type)]
    (if (servers/unknown-server? server-keyword)
      (servers/detect-server url)
      server-keyword)))

(defn- add-tray-id [tray-id projects]
  (map #(merge {:tray-id tray-id} %) projects))

(defn- add-tray-url [url projects]
  (map #(merge {:url url} %) projects))

(defn fetch-tray [tray]
  (try
    (validate-scheme tray)
    (let [server-type (get-server-type tray)
          decrypted-password (crypt/decrypt (:password tray))
          response (http-get (:url tray) (set-auth-header (:username tray) decrypted-password))]
      (->>
        (parser/get-projects response {:server server-type :normalise true})
        (add-project-ids)
        (add-server-type server-type)))
    (catch ExceptionInfo e
      [(create-error (.getMessage e) (:url tray))])))

(defn fetch-all [tray]
  (->> (fetch-tray tray)
       (add-tray-id (:tray-id tray))
       (add-tray-url (:url tray))))

(defn fetch-interesting [tray]
  (if (empty? (:included tray))
    []
    (let [projects (fetch-tray tray)]
      (if (every? is-error? projects)
        (add-tray-id (:tray-id tray) projects)
        (->> (filtering/interesting projects)
             (filter-by-ids (:included tray))
             (add-tray-id (:tray-id tray))
             (add-tray-url (:url tray)))))))

(defn get-all [trays]
  (if (= (count trays) 1)
    (fetch-all (first trays))
    (flatten (pmap fetch-all trays))))

(defn get-interesting [trays]
  (if (= (count trays) 1)
    (fetch-interesting (first trays))
    (flatten (pmap fetch-interesting trays))))
