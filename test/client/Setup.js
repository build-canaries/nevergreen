const jsdom = require('jsdom')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const sinonChai = require('sinon-chai')
const chaiImmutable = require('chai-immutable')
const chaiEnzyme = require('chai-enzyme')
const ignore = require('ignore-styles')
const sinon = require('sinon')

// Ignore non javascript imports
ignore.default(['.scss', '.png', '.mp3'])

// Register chai plugins, Note: the order of these matter!
chai.use(chaiImmutable)
chai.use(dirtyChai)
chai.use(sinonChai)
chai.use(chaiEnzyme())

// Set up default functions for timeouts
global.setTimeout = sinon.stub().returns('timer-id')
global.clearTimeout = sinon.spy()

// Set up an in memory DOM for React tests that need to mount
const {JSDOM} = jsdom
const dom = new JSDOM('')

global.window = dom.window
global.document = window.document
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}

global.HTMLElement = () => {
}
