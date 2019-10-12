const express = require('express')
const basicAuth = require('basic-auth-connect')
const fs = require('fs')

const app = express()

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
}

function response(file) {
  return function (req, res) {
    fs.readFile('resources/' + file, 'utf8', function (err, contents) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8')
      res.send(contents)
    })
  }
}

const sleep = (waitTimeInMs) => new Promise((resolve) => setTimeout(resolve, waitTimeInMs))

function delayedResponse(file) {
  return async function (req, res) {
    req.connection.on('close', function () {
      console.log('Connection closed by client')
    })

    fs.readFile('resources/' + file, 'utf8', async function (err, contents) {
      const lines = contents.split('\n')
      const sleepTime = Math.ceil((req.query.delay || 0) / lines.length)
      res.setHeader('Content-Type', 'application/xml; charset=utf-8')
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        await sleep(sleepTime)
        res.write(line)
      }
      res.end('')
    })
  }
}

const generic = response('cctray.xml')
const go = response('go_cd.xml')
const jenkins = response('jenkins.xml')

app.get('/cc.xml', jenkins) // Jenkins, Hudson, CircleCI, CruiseControl
app.get('/cc/uuid/cctray.xml', generic) // Solano CI
app.get('/owner/repo/cc.xml', generic) // Travis CI
app.get('/go/cctray.xml', go) // GO CD
app.get('/slow/go/cctray.xml', delayedResponse('go_cd.xml')) // GO CD
app.get('/guestAuth/app/rest/cctray/projects.xml', generic) // TeamCity
app.get('/XmlStatusReport.aspx', generic) // CruiseControl.rb, CruiseControl.NET

app.get('/cctray.xml', generic)
app.get('/secure/cctray.xml', basicAuth('u', 'p'), generic)

app.get('/token/cctray.xml', function (req, res) {
  if (req.headers.authorization === 'Bearer abc123') {
    generic(req, res)
  } else {
    res.status(401).send('Go away! I need a token')
  }
})

app.get('/error/:code', function (req, res) {
  res.status(req.params.code).send('Oh no, an error ' + req.params.code + ' happened!')
})

app.get('/timeout', function () {
  /* never respond */
})

app.get('/randomly-error', function (req, res) {
  if (getRandomInt(0, 100) >= 75) {
    res.status(500).send('Oh no, an error 500 happened!')
  } else {
    generic(req, res)
  }
})

app.get('/randomly-timeout', function (req, res) {
  if (getRandomInt(0, 100) < 75) {
    generic(req, res)
  }
  /* else never respond */
})

app.get('/invalid-xml', function (req, res) {
  // duplicate attributes are invalid in XML
  res.send('<Projects><Project name="name" name="name"/></Projects>')
})

app.get('/not-xml', function (req, res) {
  res.send('plain text')
})

app.listen(5050)
