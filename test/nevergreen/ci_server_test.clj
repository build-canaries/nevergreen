(ns nevergreen.ci-server-test
  (:require [clojure.test :refer :all]
            [nevergreen.ci-server :as subject]))

(def tray {:server-type :go
           :tray-id     "some-tray-id"
           :url         "some-url"
           :seen        ["project-name"]})

(def project {:unnormalised-name "project-name"})

(deftest enrich-projects

  (testing "creates a project id as the CCTray XML format doesn't include one"
    (is (= "project-name" (:project-id (first (subject/enrich-projects tray [project]))))))

  (testing "adds the tray server type"
    (is (= :go (:server-type (first (subject/enrich-projects tray [project]))))))

  (testing "adds the tray id"
    (is (= "some-tray-id" (:tray-id (first (subject/enrich-projects tray [project]))))))

  (testing "adds the fetched time"
    (binding [subject/now (constantly "some-time")]
      (is (= "some-time" (:fetched-time (first (subject/enrich-projects tray [project])))))))

  (testing "adds the is new flag"
    (is (false? (:is-new (first (subject/enrich-projects tray [project])))))
    (is (true? (:is-new (first (subject/enrich-projects tray [{:project-id "some-new-project-id"}])))))))

(deftest get-server-type

  (testing "when server type is not already known"

    (testing "go"
      (is (= :go (subject/get-server-type {:url "http://servername:8154/go/cctray.xml"}))))

    (testing "circle ci"
      (is (= :circle (subject/get-server-type {:url "https://circleci.com/cc.xml?circle-token=some-token"}))))

    (testing "any other url"
      (is (= :unknown (subject/get-server-type {:url "http://something/cctray.xml"}))))

    (testing "nil"
      (is (nil? (subject/get-server-type nil))))

    (testing "if server type is set explicitly to unknown it tries to parse the URL"
      (is (= :go (subject/get-server-type {:server-type :unknown :url "http://servername:8154/go/cctray.xml"})))))

  (testing "server type is already known"
    (is (= :go (subject/get-server-type {:server-type :go})))))
