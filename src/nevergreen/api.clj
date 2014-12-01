(ns nevergreen.api
  (:require [clj-cctray.core :as parser]
            [clj-cctray.filtering :as filtering]
            [cheshire.core :refer [generate-string]]
            [environ.core :refer [env]]
            [nevergreen.config :refer :all]
            [compojure.core :refer :all]))

(defn get-all-projects [url]
  (parser/get-projects url :options [:go :normalise]))

(defn get-interesting-projects [params]
  (->> (parser/get-projects (:cctray params) :options [:go :normalise])
       (filtering/interesting)
       (filtering/by-name (:includedProjects params))))