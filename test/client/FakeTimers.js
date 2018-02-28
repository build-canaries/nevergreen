import {after, afterEach, before} from 'mocha'
import getTime from 'date-fns/get_time'
import lolex from 'lolex'

let clock = null

before(function () {
  clock = lolex.install()
})

afterEach(function () {
  // reset back to the real system time
  clock.setSystemTime()
})

after(function () {
  clock && clock.uninstall()
})

export {clock}

export function setSystemTime(timestamp) {
  clock.setSystemTime(getTime(timestamp))
}
