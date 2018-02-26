import {after, before, beforeEach} from 'mocha'
import getTime from 'date-fns/get_time'
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

export function fixTime(timestamp) {
  clock.setSystemTime(getTime(timestamp))
}
