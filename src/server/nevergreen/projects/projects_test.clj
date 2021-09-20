(ns nevergreen.projects.projects-test
  (:require [clojure.test :refer :all]
            [nevergreen.projects.projects :as subject]
            [nevergreen.errors :as err])
  (:import (java.io StringReader)
           (org.xml.sax SAXParseException)))

(def project-id "some-project-id")
(def project-prognosis :sick)
(def example-project {:project-id project-id
                      :prognosis  project-prognosis
                      :is-new     false})

(def tray-id "some-tray-id")
(def tray-url "some-url")
(def example-tray {:tray-id     tray-id
                   :url         tray-url
                   :included    [project-id]
                   :seen        [project-id]
                   :include-new false})

(defn- expected-error
  ([msg] (expected-error msg tray-id))
  ([msg id]
   (assoc (err/create-error msg tray-url) :tray-id id)))

(deftest get-projects

  ; fetch needs to return something with a close method as we use (with-open)
  (binding [subject/*fetch* (constantly (StringReader. "some-xml-response"))
            subject/*parse* (constantly [example-project])
            subject/*enrich* (fn [_ projects] projects)
            err/*now* (constantly "some-time")]

    (testing "works when given a single tray"
      (is (= [example-project]
             (subject/get-projects {:feeds     [example-tray]
                                    :prognosis [project-prognosis]}))))

    (testing "filters out any projects with prognosis not in the given list"
      (is (= []
             (subject/get-projects {:feeds     [example-tray]
                                    :prognosis [:healthy]})))
      (is (= [example-project]
             (subject/get-projects {:feeds     [example-tray]
                                    :prognosis [project-prognosis]}))))

    (testing "doesn't filter out any projects when prognosis is not given"
      (is (= [example-project]
             (subject/get-projects {:feeds [example-tray]}))))

    (testing "filters out any projects that are jobs (these are currently exclusive to GoCD and add too much noise to the UI)"
      (binding [subject/*parse* (constantly [(merge example-project {:job "some-job"})])]
        (is (= []
               (subject/get-projects {:feeds [example-tray]})))))

    (testing "works when given multiple trays"
      (is (= [example-project example-project]
             (subject/get-projects {:feeds [example-tray example-tray]}))))

    (testing "returns an empty array when no projects are included and new projects aren't included"
      (is (= []
             (subject/get-projects {:feeds [(merge example-tray {:included    []
                                                                 :include-new false})]}))))

    (testing "includes new projects that have not been seen before"
      (binding [subject/*enrich* (constantly [(merge example-project {:is-new true})])]
        (is (= [(merge example-project {:is-new true})]
               (subject/get-projects {:feeds [(merge example-tray {:included    []
                                                                   :include-new true
                                                                   :seen        ["different-project-id"]})]})))))

    (testing "doesn't include new projects that have not been seen before"
      (binding [subject/*enrich* (constantly [(merge example-project {:is-new true})])]
        (is (= []
               (subject/get-projects {:feeds [(merge example-tray {:included    ["different-project-id"]
                                                                   :include-new false
                                                                   :seen        ["different-project-id"]})]})))))

    (testing "includes everything if included is nil"
      (is (= [example-project]
             (subject/get-projects {:feeds [(merge example-tray {:included nil})]}))))

    (testing "removes keys not required by the UI"
      (binding [subject/*parse* (constantly [{:activity         "sleeping"
                                            :job                ""
                                            :last-build-label   "83"
                                            :last-build-status  "success"
                                            :last-build-time    "2019-11-28T21:53:00.410Z"
                                            :messages           []
                                            :name               "clj cctray"
                                            :next-build-time    nil
                                            :owner              "build canaries"
                                            :prognosis          project-prognosis
                                            :stage              ""
                                            :unnormalised-name  "clj-cctray"
                                            :unnormalised-owner "build-canaries"
                                            :web-url            "some-url"}])
                subject/*enrich* (fn [_ projects] (map #(merge % {:description "clj cctray"
                                                                :timestamp     "2020-03-24T20:23:42.707190Z"
                                                                :is-new        false
                                                                :project-id    project-id
                                                                :server-type   ""
                                                                :tray-id       tray-id}) projects))]
        (is (= [{:description      "clj cctray"
                 :timestamp        "2020-03-24T20:23:42.707190Z"
                 :is-new           false
                 :last-build-label "83"
                 :prognosis        project-prognosis
                 :project-id       project-id
                 :server-type      ""
                 :tray-id          tray-id
                 :web-url          "some-url"}]
               (subject/get-projects {:feeds [example-tray]})))))

    (testing "sorting"

      (let [project-1 {:description "b"
                       :timestamp   "2020-05-06T14:00:00.000000Z"
                       :prognosis   :sick-building
                       :project-id  "b"
                       :tray-id     tray-id}
            project-2 {:description "a"
                       :timestamp   "2020-05-06T11:00:00.000000Z"
                       :prognosis   :healthy-building
                       :project-id  "a"
                       :tray-id     tray-id}
            project-3 {:description "c"
                       :timestamp   "2020-05-06T13:00:00.000000Z"
                       :prognosis   :sick
                       :project-id  "c"
                       :tray-id     tray-id}
            project-4 {:description "e"
                       :timestamp   "2020-05-06T15:00:00.000000Z"
                       :prognosis   :unknown
                       :project-id  "e"
                       :tray-id     tray-id}
            project-5 {:description "d"
                       :timestamp   "2020-05-06T12:00:00.000000Z"
                       :prognosis   :healthy
                       :project-id  "d"
                       :tray-id     tray-id}
            feeds [(merge example-tray {:include-new true})]]
        (binding [subject/*enrich* (fn [_ _] [project-1 project-2 project-3 project-4 project-5])]

          (testing "nil (no sorting)"
            (is (= [project-1 project-2 project-3 project-4 project-5]
                   (subject/get-projects {:feeds feeds
                                          :sort  nil}))))

          (testing "blank (no sorting)"
            (is (= [project-1 project-2 project-3 project-4 project-5]
                   (subject/get-projects {:feeds feeds
                                          :sort  ""}))))

          (testing "by description (alphabetical)"
            (is (= [project-2 project-1 project-3 project-5 project-4]
                   (subject/get-projects {:feeds feeds
                                          :sort  "description"}))))

          (testing "by timestamp (newest first)"
            (is (= [project-4 project-1 project-3 project-5 project-2]
                   (subject/get-projects {:feeds feeds
                                          :sort  "timestamp"}))))

          (testing "by prognosis (sick > sick-building > healthy-building > unknown > healthy)"
            (is (= [project-3 project-1 project-2 project-4 project-5]
                   (subject/get-projects {:feeds feeds
                                          :sort  "prognosis"})))))))

    (testing "error handling"

      (testing "returns the error message when fetching fails"
        (binding [subject/*fetch* (fn [_] (throw (ex-info "some-error" {})))]
          (is (= [(expected-error "some-error")]
                 (subject/get-projects {:feeds [example-tray]})))))

      (testing "returns the error message when parsing fails with a generic exception"
        (binding [subject/*parse* (fn [_ _] (throw (ex-info "some-error" {})))]
          (is (= [(expected-error "some-error")]
                 (subject/get-projects {:feeds [example-tray]})))))

      (testing "returns a more friendly error message when parsing fails because the response is not XML at all"
        (binding [subject/*parse* (fn [_ _] (throw (SAXParseException. "Content is not allowed in prolog." nil)))]
          (is (= [(expected-error "Response is not XML, is the URL pointing to the CCTray XML feed?")]
                 (subject/get-projects {:feeds [example-tray]})))))

      (testing "returns a prefixed error message when parsing fails because the XML is invalid"
        (binding [subject/*parse* (fn [_ _] (throw (SAXParseException. "some-error" nil)))]
          (is (= [(expected-error "XML is invalid. some-error")]
                 (subject/get-projects {:feeds [example-tray]})))))

      (testing "returns errors and projects if only one tray fails for any reason"
        (binding [subject/*fetch* (fn [{:keys [tray-id]}] (if (= "fail-id" tray-id)
                                                          (throw (ex-info "some-error" {}))
                                                          (StringReader. "some-xml-response")))]
          (is (= [example-project (expected-error "some-error" "fail-id")]
                 (subject/get-projects {:feeds [example-tray (merge example-tray {:tray-id "fail-id"
                                                                                  :url     tray-url})]}))))))))
