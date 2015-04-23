(ns nevergreen.api.projects
  (:require [clj-cctray.core :as parser]
            [clj-cctray.filtering :as filtering]
            [clojure.string :refer [blank?]]
            [nevergreen.http :refer [http-get]]
            [nevergreen.servers :as servers]
            [nevergreen.security :as security]
            [nevergreen.crypto :as crypt]))

(defn invalid-url? [url]
  (or (blank? url)
      (not (re-find #"https?://" url))))

(defn- ensure-url-is-valid [{:keys [url]}]
  (if (invalid-url? url)
    (throw (IllegalArgumentException. (str url " is not a valid url! Only http(s) urls are supported.")))))

(defn- set-auth-header [username password]
  (if-not (or (blank? username) (blank? password))
    (security/basic-auth-header username password)))

(defn get-server-type [{:keys [serverType url]}]
  (let [server-type (keyword serverType)]
    (if (servers/unknown-server? server-type)
      (servers/detect-server url)
      server-type)))

(defn fetch-interesting [project]
  (ensure-url-is-valid project)
  (let [password (if-not (blank? (:password project)) (crypt/decrypt (:password project)))]
    (->> (parser/get-projects
           (http-get (:url project) (set-auth-header (:username project) password))
           {:normalise true :server (get-server-type project)})
         (filtering/interesting)
         (filtering/by-name (:included project)))))

(defn get-interesting [projects]
  (if (= (count projects) 1)
    (fetch-interesting (first projects))
    (flatten (pmap fetch-interesting projects))))
