(ns nevergreen.api
  (:require [clj-cctray.core :as parser]
            [clj-cctray.filtering :as filtering]
            [clojure.string :refer [blank?]]
            [nevergreen.http :refer :all]
            [nevergreen.servers :as servers]
            [nevergreen.security :as security]))

(defn invalid-url? [url]
  (or (blank? url)
      (not (re-find #"https?://" url))))

(defn get-all-projects [{:keys [url username password]}]
  (if (invalid-url? url) (throw (IllegalArgumentException. "Not a valid url")))

  (let [server-type (servers/detect-server url)
        auth-header (if (and username password) (security/basic-auth-header username password) {})
        password (if password {:password (security/create-hash password)})]
    (merge {:projects (parser/get-projects (http-get url auth-header) {:normalise true :server server-type})
            :server   server-type}
           password)))

(defn options-from-config [{:keys [serverType cctray]}]
  (let [server-type (keyword serverType)]
    (if (servers/unknown-server? server-type)
      {:normalise true :server (servers/detect-server cctray)}
      {:normalise true :server (keyword server-type)})))

(defn get-interesting-projects [params]
  (if (invalid-url? (:cctray params)) (throw (IllegalArgumentException. "Not a valid url")))

  (->> (parser/get-projects (http-get (:cctray params) nil) (options-from-config params))
       (filtering/interesting)
       (filtering/by-name (:includedProjects params))))
