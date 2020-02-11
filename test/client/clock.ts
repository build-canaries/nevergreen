import getTime from 'date-fns/getTime'
import parseISO from 'date-fns/parseISO'
import FakeTimers from '@sinonjs/fake-timers'

const clock = FakeTimers.install()

afterEach(() => {
  // reset back to the real system time
  clock.setSystemTime()
})

afterAll(() => {
  clock.uninstall()
})

export {clock}

export function setSystemTime(timestamp: string) {
  clock.setSystemTime(getTime(parseISO(timestamp)))
}
