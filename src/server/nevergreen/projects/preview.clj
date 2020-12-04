(ns nevergreen.projects.preview
  (:require [nevergreen.projects.projects :as projects]
            [clojure.string :as s])
  (:import (java.io StringReader)
           (java.util Random)
           (java.time Clock)))

(defn- rand-str [rnd]
  (apply str (take (+ (.nextInt rnd 6) 4)
                   (repeatedly #(char (+ (.nextInt rnd 26) 97))))))

(defn- rand-prognosis [rnd]
  (condp = (.nextInt rnd 6)
    0 :error
    1 :sick
    2 :sick-building
    3 :healthy-building
    4 :healthy
    5 :unknown))

(defn- generate-projects [source _]
  (let [tray-id (.toString source)
        rnd (Random. (.hashCode tray-id))
        projects-to-generate (range (+ 3 (.nextInt rnd 97)))]
    (map (fn [_] (let [prognosis (rand-prognosis rnd)
                       name (str (rand-str rnd) (s/replace prognosis #"[-:]" " "))]
                   {:last-build-label  (str (.nextInt rnd 10000))
                    :last-build-time   (-> (Clock/systemUTC)
                                           (.instant)
                                           (.minusSeconds (.nextInt rnd 86401)))
                    :name              name
                    :prognosis         prognosis
                    :unnormalised-name name
                    :web-url           "https://github.com/build-canaries/nevergreen"
                    :tray-id           tray-id}))
         projects-to-generate)))

(defn preview [request]
  ; fetch needs to return something closeable
  (binding [projects/fetch (fn [feed] (StringReader. (:tray-id feed)))
            projects/parse generate-projects]
    (projects/get-projects request)))
