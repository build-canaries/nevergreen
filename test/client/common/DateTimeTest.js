import {expect} from 'chai'
import {describe, it} from 'mocha'
import {setSystemTime} from '../FakeTimers'
import {abbreviateDuration, formatAsDuration, secondsToString} from '../../../src/client/common/DateTime'
import {forNonStrings, forUndisplayableStrings} from '../TestUtils'

describe('DateTime', function () {

  describe('formatAsDuration', function () {

    forUndisplayableStrings((value, friendlyName) => {
      it(`should return "unknown" for undisplayble string value ${friendlyName}`, function () {
        expect(formatAsDuration(value)).to.equal('unknown')
      })
    })

    forNonStrings((value, friendlyName) => {
      it(`should return "unknown" for non string value ${friendlyName}`, function () {
        expect(formatAsDuration(value)).to.equal('unknown')
      })
    })

    it('should return the duration for a valid date timestamp', function () {
      setSystemTime('2018-02-18T23:38:00Z')
      expect(formatAsDuration('2018-02-18T22:38:00.000Z')).to.equal('about 1 hour')
    })
  })

  describe('abbreviateDuration', function () {

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
      it(`should return "${args.expected}" when "${args.value}"`, function () {
        expect(abbreviateDuration(args.value)).to.equal(args.expected)
      })
    })

    forUndisplayableStrings((value, friendlyName) => {
      it(`should return an empty string for invalid value ${friendlyName}`, function () {
        expect(abbreviateDuration(value)).to.equal('')
      })
    })
  })

  describe('secondsToString', function () {

    it('should format anything less than a minute as seconds', function () {
      expect(secondsToString(1)).to.equal('1 second')
      expect(secondsToString(59)).to.equal('59 seconds')
    })

    it('should format anything less than an hour as minutes', function () {
      expect(secondsToString(60)).to.equal('1 minute')
      expect(secondsToString(3599)).to.equal('59 minutes')
    })

    it('should format anything less than a day as hours', function () {
      expect(secondsToString(3600)).to.equal('1 hour')
      expect(secondsToString(86399)).to.equal('23 hours')
    })

    it('should format anything larger as days', function () {
      expect(secondsToString(86400)).to.equal('1 day')
      expect(secondsToString(216000)).to.equal('2 days')
    })
  })
})
