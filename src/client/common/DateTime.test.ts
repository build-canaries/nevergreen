import {formatAsDuration, secondsToString} from './DateTime'
import {setSystemTime} from '../testUtils/testHelpers'

describe('formatAsDuration', () => {

  it.each(
    [null, undefined, '', '  ']
  )('should return "unknown" for undisplayble string value "%s"', (val) => {
    expect(formatAsDuration(val)).toBe('unknown')
  })

  it('should return the duration for a valid date timestamp', () => {
    setSystemTime('2018-02-18T23:38:00Z')
    expect(formatAsDuration('2018-02-18T22:38:00.000Z')).toBe('about 1 hour')
  })
})

describe('secondsToString', () => {

  it('should format anything less than a minute as seconds', () => {
    expect(secondsToString(1)).toBe('1 second')
    expect(secondsToString(59)).toBe('59 seconds')
  })

  it('should format anything less than an hour as minutes', () => {
    expect(secondsToString(60)).toBe('1 minute')
    expect(secondsToString(3599)).toBe('59 minutes')
  })

  it('should format anything less than a day as hours', () => {
    expect(secondsToString(3600)).toBe('1 hour')
    expect(secondsToString(86399)).toBe('23 hours')
  })

  it('should format anything larger as days', () => {
    expect(secondsToString(86400)).toBe('1 day')
    expect(secondsToString(216000)).toBe('2 days')
  })
})
