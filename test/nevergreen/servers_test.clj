(ns nevergreen.servers-test
  (:require [nevergreen.servers :as subject]
            [midje.sweet :refer :all]))

(facts "detecting server"
       (fact "jenkins"
             (subject/detect-server "http://jenkins.servername:8080/cc.xml") => :jenkins)

       (fact "hosted jenkins"
             (subject/detect-server "https://instance.ci.cloudbees.com/cc.xml") => :jenkins)

       (fact "hudson"
             (subject/detect-server "http://hudson.servername:8080/cc.xml") => :hudson)

       (fact "travis ci"
             (subject/detect-server "http://travis-ci.org/ownername/repositoryname/cc.xml") => :travis)

       (fact "go"
             (subject/detect-server "http://servername:8154/go/cctray.xml") => :go)

       (fact "snap"
             (subject/detect-server "https://app.snap-ci.com/ownername/reponame/branch/master/cctray.xml") => :snap)

       (fact "circle ci"
             (subject/detect-server "https://circleci.com/cc.xml?circle-token=some-token") => :circle)

       (fact "team city"
             (subject/detect-server "http://teamcity:8111/guestAuth/app/rest/cctray/projects.xml") => :team-city)

       (fact "cruise control rb"
             (subject/detect-server "http://cc.rb.servername:3333/XmlStatusReport.aspx") => :cruise-control-rb)

       (fact "cruise control"
             (subject/detect-server "http://cc.java.servername:8080/cctray.xml") => :cruise-control)

       (fact "cruise control .net"
             (subject/detect-server "http://cc.net.servername/XmlStatusReport.aspx") => :cruise-control-net)

       (fact "solano ci"
             (subject/detect-server "http://api.tddium.com/cc/long_uuid_string/cctray.xml") => :solano)

       (fact "any other url"
             (subject/detect-server "http://something/cctray.xml") => :unknown)

       (fact "nil"
             (subject/detect-server nil) => nil))

(tabular
  (fact "unknown server?"
        (subject/unknown-server? ?type) => ?result)
  ?type ?result
  nil true
  (keyword "") true
  :unknown true
  :go false
  :snap false
  :jenkins false
  :hudson false
  :travis false
  :team-city false
  :cruise-control-rb false
  :cruise-control false
  :cruise-control-net false
  :solano false)
