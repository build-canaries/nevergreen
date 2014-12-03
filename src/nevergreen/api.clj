(ns nevergreen.api
  (:require [clj-cctray.core :as parser]
            [clj-cctray.filtering :as filtering]
            [clj-cctray.ci.go-snap :as go]
            [cheshire.core :refer [generate-string]]
            [environ.core :refer [env]]
            [nevergreen.config :refer :all]
            [compojure.core :refer :all]))

(defn get-all-projects [url]
  (->>
    (parser/get-projects url :options [:go :normalise])
    (go/distinct-projects)))

(defn get-interesting-projects [params]
  (->> (parser/get-projects (:cctray params) :options [:go :normalise])
       (go/distinct-projects)
       (filtering/interesting)
       (filtering/by-name (:includedProjects params))))