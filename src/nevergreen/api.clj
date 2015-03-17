(ns nevergreen.api
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

(defn- set-auth-header [username password]
  (if-not (or (blank? username) (blank? password))
    (security/basic-auth-header username password)))

(defn get-all-projects [{:keys [url username password]}]
  (if (invalid-url? url) (throw (IllegalArgumentException. "Not a valid url")))

  (let [server-type (servers/detect-server url)
        decrypted-password (if-not (blank? password) (crypt/decrypt password))
        auth-header (set-auth-header username decrypted-password)]
    {:projects (parser/get-projects (http-get url auth-header) {:normalise true :server server-type})
     :server   server-type}))

(defn options-from-config [{:keys [serverType cctray]}]
  (let [server-type (keyword serverType)]
    (if (servers/unknown-server? server-type)
      {:normalise true :server (servers/detect-server cctray)}
      {:normalise true :server (keyword server-type)})))

(defn get-interesting-projects [params]
  (if (invalid-url? (:cctray params)) (throw (IllegalArgumentException. "Not a valid url")))

  (let [password (if-not (blank? (:password params))
                   (crypt/decrypt (:password params)))]
    (->> (parser/get-projects (http-get (:cctray params) (set-auth-header (:username params) password)) (options-from-config params))
         (filtering/interesting)
         (filtering/by-name (:includedProjects params)))))

(defn encrypt-password [password]
  {:password (crypt/encrypt password)})
