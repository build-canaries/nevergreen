import {after, before, beforeEach} from 'mocha'
import lolex from 'lolex'

let clock = null

before(function () {
  clock = lolex.install()
})

beforeEach(function () {
  clock.setSystemTime()
})

after(function () {
  clock && clock.uninstall()
})

export {clock}
