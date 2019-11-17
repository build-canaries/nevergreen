import {setSystemTime} from '../clock'
import {abbreviateDuration, formatAsDuration, secondsToString} from '../../../src/client/common/DateTime'

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

describe('abbreviateDuration', () => {

  const abbreviatedTests = [
    {value: 'unknown', expected: '??'},
    {value: 'less than a minute', expected: '<1m'},
    {value: 'about 1 minute', expected: '1m'},
    {value: 'almost 7 minutes', expected: '7m'},
    {value: 'about 1 hour', expected: '1h'},
    {value: 'over 3 hours', expected: '>3h'},
    {value: 'almost 1 day', expected: '1d'},
    {value: '1 month', expected: '1mo'},
    {value: '3 years', expected: '3y'}
  ]

  abbreviatedTests.forEach((args) => {
    it(`should return "${args.expected}" when "${args.value}"`, () => {
      expect(abbreviateDuration(args.value)).toBe(args.expected)
    })
  })

  it.each(
    [null, undefined, '', '  ']
  )('should return an empty string for invalid value "%s"', (val) => {
    expect(abbreviateDuration(val)).toBe('')
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
