var express = require('express')
var basicAuth = require('basic-auth-connect')
var fs = require('fs')

var app = express()

var generic = response('cctray.xml')
var go = response('go_cd.xml')
var jenkins = response('jenkins.xml')
var snap = response('snap_ci.xml')

function response(file) {
  return function (req, res) {
    fs.readFile('ci_stub_server/' + file, 'utf8', function (err, contents) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8')
      res.send(contents)
    })
  }
}

app.get('/owner/repo/branch/master/cctray.xml', snap) // Snap CI
app.get('/cc.xml', jenkins) // Jenkins, Hudson, CircleCI, CruiseControl
app.get('/cc/uuid/cctray.xml', generic) // Solano CI
app.get('/owner/repo/cc.xml', generic) // Travis CI
app.get('/go/cctray.xml', go) // GO CD
app.get('/guestAuth/app/rest/cctray/projects.xml', generic) // TeamCity
app.get('/XmlStatusReport.aspx', generic) // CruiseControl.rb, CruiseControl.NET

app.get('/cctray.xml', generic)
app.get('/secure/cctray.xml', basicAuth('u', 'p'), generic)

app.listen(5050)
