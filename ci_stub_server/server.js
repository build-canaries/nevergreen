var express = require('express')
var basicAuth = require('basic-auth-connect')
var fs = require('fs')

var app = express()

var generic = response('cctray.xml')
var go = response('go_cd.xml')
var jenkins = response('jenkins.xml')

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
}

function response(file) {
  return function (req, res) {
    fs.readFile('ci_stub_server/' + file, 'utf8', function (err, contents) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8')
      res.send(contents)
    })
  }
}

app.get('/cc.xml', jenkins) // Jenkins, Hudson, CircleCI, CruiseControl
app.get('/cc/uuid/cctray.xml', generic) // Solano CI
app.get('/owner/repo/cc.xml', generic) // Travis CI
app.get('/go/cctray.xml', go) // GO CD
app.get('/guestAuth/app/rest/cctray/projects.xml', generic) // TeamCity
app.get('/XmlStatusReport.aspx', generic) // CruiseControl.rb, CruiseControl.NET

app.get('/cctray.xml', generic)
app.get('/secure/cctray.xml', basicAuth('u', 'p'), generic)

app.get('/error/:code', function (req, res) {
  res.status(req.params.code).send('Oh no, an error ' + req.params.code + ' happened!')
})

app.get('/randomly-error', function (req, res) {
  if (getRandomInt(0, 100) >= 75) {
    res.status(req.params.code).send('Oh no, an error ' + req.params.code + ' happened!')
  } else {
    generic(req, res)
  }
})

app.listen(5050)
