(ns nevergreen.projects.ci-server-test
  (:require [clojure.test :refer :all]
            [nevergreen.projects.ci-server :as subject]))

(def tray {:server-type :go
           :tray-id     "some-tray-id"
           :url         "some-url"
           :seen        ["project-name"]})

(def project {:unnormalised-name "project-name"})

(deftest enrich-projects

  (testing "creates a project id as the CCTray XML format doesn't include one"
    (is (= "owner/name/stage/job" (:project-id (first (subject/enrich-projects tray [{:unnormalised-owner "owner"
                                                                                      :unnormalised-name  "name"
                                                                                      :unnormalised-stage "stage"
                                                                                      :unnormalised-job   "job"}]))))))

  (testing "adds the description"
    (testing "which is just the name if no stage exists"
      (is (= "some name" (:description (first (subject/enrich-projects tray [{:name "some name" :stage ""}]))))))

    (testing "which is the name and stage if one exists"
      (is (= "some name some stage" (:description (first (subject/enrich-projects tray [{:name "some name" :stage "some stage"}])))))))

  (testing "adds the tray server type"
    (is (= :go (:server-type (first (subject/enrich-projects tray [project]))))))

  (testing "adds the tray id"
    (is (= "some-tray-id" (:tray-id (first (subject/enrich-projects tray [project]))))))

  (testing "adds the timestamp"
    (testing "set to now if the project is building so the UI can calculate the building time"
      (binding [subject/now (constantly "some-time")]
        (is (= "some-time" (:timestamp (first (subject/enrich-projects tray [{:prognosis :healthy-building}])))))))

    (testing "set to the last build time if the project is not building"
      (is (= "last-time" (:timestamp (first (subject/enrich-projects tray [{:prognosis :sick :last-build-time "last-time"}])))))))

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
