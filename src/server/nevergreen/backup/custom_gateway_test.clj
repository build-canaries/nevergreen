(ns nevergreen.backup.custom-gateway-test
  (:require [clojure.test :refer :all]
            [nevergreen.backup.custom-gateway :as subject]))

(deftest create-configuration

  (testing "POSTs to the given URL"
    (binding [subject/*http-post* (fn [url _]
                                  (is (= "https://some-host" url)))]
      (subject/create-configuration {:url "https://some-host"})))

  (testing "sets the correct body"
    (binding [subject/*http-post* (fn [_ data]
                                  (is (= "some-config"
                                         (:body data))))]
      (subject/create-configuration {:configuration "some-config"}))))

(deftest get-configuration

  (testing "GETs from the given URL"
    (binding [subject/*http-get* (fn [url _]
                                 (is (= "http://some-url" url)))]
      (subject/get-configuration "http://some-url")))

  (testing "sets the correct mime type"
    (binding [subject/*http-get* (fn [_ data]
                                 (is (= "application/json"
                                        (:accept data))))]
      (subject/get-configuration "http://some-url")))

  (testing "GETs the response as a string and not JSON"
    (binding [subject/*http-get* (fn [_ data]
                                 (is (= :string
                                        (:as data))))]
      (subject/get-configuration "http://some-url"))))
