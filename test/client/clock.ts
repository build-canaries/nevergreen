import getTime from 'date-fns/get_time'
import lolex from 'lolex'

const clock = lolex.install()

afterEach(() => {
  // reset back to the real system time
  clock.setSystemTime()
})

afterAll(() => {
  clock.uninstall()
})

export {clock}

export function setSystemTime(timestamp: string) {
  clock.setSystemTime(getTime(timestamp))
}
