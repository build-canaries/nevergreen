var express = require('express')
var basicAuth = require('basic-auth-connect')
var fs = require('fs')

var app = express()

var response = function(req, res) {
  fs.readFile('resources/public/test_data.xml', 'utf8', function(err, contents) {
    res.setHeader('Content-Type', 'application/xml')
    res.send(contents)
  })}

app.get('/cctray.xml', response)
app.get('/secure/cctray.xml', basicAuth('u', 'p'), response)

app.listen(5050)
