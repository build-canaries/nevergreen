(ns nevergreen.api.projects-test
  (:require [clojure.test :refer :all]
            [nevergreen.api.projects :as subject]
            [nevergreen.errors :as err])
  (:import (java.io StringReader)
           (org.xml.sax SAXParseException)))

(def tray-id "some-id")
(def tray-url "some-url")
(def example-tray {:tray-id tray-id :url tray-url})

(def project-prognosis :sick)
(def example-project {:project-id "some-id" :prognosis project-prognosis})

(defn expected-error
  ([msg] (expected-error msg tray-id))
  ([msg id]
   (assoc (err/create-error msg tray-url) :tray-id id)))

(deftest get-projects

  ; mock-fetch needs to return something with a close method as we use (with-open)
  (binding [subject/fetch (constantly (StringReader. "some-xml-response"))
            subject/parse (constantly [example-project])
            subject/enrich (constantly [example-project])]

    (testing "works when given a single tray"
      (is (= [example-project] (subject/get-projects [example-tray] [project-prognosis]))))

    (testing "filters out any projects with prognosis not in the given list"
      (is (= [] (subject/get-projects [example-tray] [:healthy]))))

    (testing "works when given multiple trays"
      (is (= [example-project example-project]
             (subject/get-projects [example-tray example-tray] [project-prognosis]))))

    (testing "returns an empty array when no projects are included"
      (is (= [] (subject/get-projects [{:included []}] [project-prognosis]))))

    (testing "error handling"

      (testing "returns the error message when fetching fails"
        (binding [subject/fetch (fn [_] (throw (ex-info "some-error" {})))]
          (is (= [(expected-error "some-error")]
                 (subject/get-projects [example-tray] [project-prognosis])))))

      (testing "returns the error message when parsing fails with a generic exception"
        (binding [subject/parse (fn [_ _] (throw (ex-info "some-error" {})))]
          (is (= [(expected-error "some-error")]
                 (subject/get-projects [example-tray] [project-prognosis])))))

      (testing "returns a more friendly error message when parsing fails because the response is not XML at all"
        (binding [subject/parse (fn [_ _] (throw (SAXParseException. "Content is not allowed in prolog." nil)))]
          (is (= [(expected-error "Response is not XML, is the URL pointing to the CCTray XML feed?")]
                 (subject/get-projects [example-tray] [project-prognosis])))))

      (testing "returns a prefixed error message when parsing fails because the XML is invalid"
        (binding [subject/parse (fn [_ _] (throw (SAXParseException. "some-error" nil)))]
          (is (= [(expected-error "XML is invalid. some-error")]
                 (subject/get-projects [example-tray] [project-prognosis])))))

      (testing "returns errors and projects if only one tray fails for any reason"
        (binding [subject/fetch (fn [{:keys [tray-id]}] (if (= "fail-id" tray-id)
                                                          (throw (ex-info "some-error" {}))
                                                          (StringReader. "some-xml-response")))]
          (is (= [example-project (expected-error "some-error" "fail-id")]
                 (subject/get-projects [example-tray {:tray-id "fail-id" :url tray-url}] [project-prognosis]))))))))
