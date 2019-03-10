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

  (testing "adds the tray url"
    (is (= "some-url" (:url (first (subject/enrich-projects tray [project]))))))

  (testing "adds the fetched time"
    (binding [subject/now (constantly "some-time")]
      (is (= "some-time" (:fetched-time (first (subject/enrich-projects tray [project])))))))

  (testing "adds the is new flag"
    (is (false? (:is-new (first (subject/enrich-projects tray [project])))))
    (is (true? (:is-new (first (subject/enrich-projects tray [{:project-id "some-new-project-id"}])))))))

(deftest get-server-type

  (testing "when server type is not already known"

    (testing "jenkins"
      (is (= :jenkins (subject/get-server-type {:url "http://jenkins.servername:8080/cc.xml"}))))

    (testing "hosted jenkins"
      (is (= :jenkins (subject/get-server-type {:url "https://instance.ci.cloudbees.com/cc.xml"}))))

    (testing "hudson"
      (is (= :hudson (subject/get-server-type {:url "http://hudson.servername:8080/cc.xml"}))))

    (testing "travis ci"
      (is (= :travis (subject/get-server-type {:url "http://travis-ci.org/ownername/repositoryname/cc.xml"}))))

    (testing "go"
      (is (= :go (subject/get-server-type {:url "http://servername:8154/go/cctray.xml"}))))

    (testing "circle ci"
      (is (= :circle (subject/get-server-type {:url "https://circleci.com/cc.xml?circle-token=some-token"}))))

    (testing "team city"
      (is (= :team-city (subject/get-server-type {:url "http://teamcity:8111/guestAuth/app/rest/cctray/projects.xml"}))))

    (testing "cruise control rb"
      (is (= :cruise-control-rb (subject/get-server-type {:url "http://cc.rb.servername:3333/XmlStatusReport.aspx"}))))

    (testing "cruise control"
      (is (= :cruise-control (subject/get-server-type {:url "http://cc.java.servername:8080/cctray.xml"}))))

    (testing "cruise control .net"
      (is (= :cruise-control-net (subject/get-server-type {:url "http://cc.net.servername/XmlStatusReport.aspx"}))))

    (testing "solano ci"
      (is (= :solano (subject/get-server-type {:url "http://api.tddium.com/cc/long_uuid_string/cctray.xml"}))))

    (testing "any other url"
      (is (= :unknown (subject/get-server-type {:url "http://something/cctray.xml"}))))

    (testing "nil"
      (is (nil? (subject/get-server-type nil))))

    (testing "if server type is set explicitly to unknown it tries to parse the URL"
      (is (= :jenkins (subject/get-server-type {:server-type :unknown :url "http://jenkins.servername:8080/cc.xml"})))))

  (testing "server type is already known"
    (is (= :jenkins (subject/get-server-type {:server-type :jenkins})))))
