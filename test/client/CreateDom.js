const jsdom = require('jsdom')
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
