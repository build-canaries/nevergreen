const jsdom = require('jsdom')
const URL = require('whatwg-url').URL
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const sinonChai = require('sinon-chai')
const chaiImmutable = require('chai-immutable')
const chaiEnzyme = require('chai-enzyme')
const ignore = require('ignore-styles')
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

// Ignore non javascript imports
ignore.default(['.scss', '.png', '.mp3'])

// Configure Enzyme to use the React 16 adapter
Enzyme.configure({adapter: new Adapter()})

// Register chai plugins, Note: the order of these matter!
chai.use(chaiImmutable)
chai.use(dirtyChai)
chai.use(sinonChai)
chai.use(chaiEnzyme())

// Set up an in memory DOM for React tests that need to mount
const {JSDOM} = jsdom
const dom = new JSDOM('', {url: 'http://localhost'})

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

global.URL = URL
