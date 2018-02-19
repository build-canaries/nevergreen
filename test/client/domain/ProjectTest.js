import {expect} from 'chai'
import {describe, it} from 'mocha'
import {clock} from '../FakeTimers'
import {
  abbreviateTimeBroken,
  formatBuildLabel,
  formatTimeBroken,
  isSick,
  PROGNOSIS_HEALTHY_BUILDING,
  PROGNOSIS_SICK,
  PROGNOSIS_SICK_BUILDING,
  PROGNOSIS_UNKNOWN
} from '../../../src/client/domain/Project'

describe('Project', function () {
  describe('time broken', function () {
    const invalidValues = [null, undefined, '']

    invalidValues.forEach((value) => {
      it(`should return "unknown" for invalid value ${value}`, function () {
        expect(formatTimeBroken(value)).to.equal('unknown')
      })
    })

    it('should return the time broken for a valid date', function () {
      clock.setSystemTime(1518997080000) // 2018-02-18T23:38:00.000Z
      expect(formatTimeBroken('2018-02-18T22:38:00.000Z')).to.equal('about 1 hour')
    })

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
      it(`should return the abbreviated time broken when "${args.value}"`, function () {
        expect(abbreviateTimeBroken(args.value)).to.equal(args.expected)
      })
    })
  })

  describe('formatBuildLabel', function () {
    it('should add a # to numbers', function () {
      expect(formatBuildLabel('1234')).to.equal('#1234')
    })

    it('should trim the build label to 10 characters', function () {
      expect(formatBuildLabel('abcdefghijklmnopqrstuvwxyz')).to.equal('abcdefghij')
    })
  })

  describe('isSick', function () {
    it('should be true when given the value "sick"', function () {
      expect(isSick(PROGNOSIS_SICK)).to.be.true()
    })

    const invalidValues = [
      null,
      undefined,
      '',
      PROGNOSIS_UNKNOWN,
      PROGNOSIS_HEALTHY_BUILDING,
      PROGNOSIS_SICK_BUILDING
    ]

    invalidValues.forEach((value) => {
      it(`should be false for value ${value}`, function () {
        expect(isSick(value)).to.be.false()
      })
    })
  })
})
