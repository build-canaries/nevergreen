import {expect} from 'chai'
import {describe, it} from 'mocha'
import {setSystemTime} from '../FakeTimers'
import {
  abbreviateDuration,
  formatBuildLabel,
  formatDuration,
  isBuilding,
  isSick,
  PROGNOSIS_HEALTHY_BUILDING,
  PROGNOSIS_SICK,
  PROGNOSIS_SICK_BUILDING,
  PROGNOSIS_UNKNOWN
} from '../../../src/client/domain/Project'
import {forNonStrings, forUndisplayablesStrings} from '../TestUtils'

describe('Project', function () {

  describe('format duration', function () {

    forUndisplayablesStrings((value, friendlyName) => {
      it(`should return "unknown" for undisplayble string value ${friendlyName}`, function () {
        expect(formatDuration(value)).to.equal('unknown')
      })
    })

    forNonStrings((value, friendlyName) => {
      it(`should return "unknown" for non string value ${friendlyName}`, function () {
        expect(formatDuration(value)).to.equal('unknown')
      })
    })

    it('should return the duration for a valid date timestamp', function () {
      setSystemTime('2018-02-18T23:38:00Z')
      expect(formatDuration('2018-02-18T22:38:00.000Z')).to.equal('about 1 hour')
    })
  })

  describe('abbreviate duration', function () {

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

    forUndisplayablesStrings((value, friendlyName) => {
      it(`should return an empty string for invalid value ${friendlyName}`, function () {
        expect(abbreviateDuration(value)).to.equal('')
      })
    })
  })

  describe('format build label', function () {
    forUndisplayablesStrings((value, friendlyName) => {
      it(`should return empty string for undisplayable value ${friendlyName}`, function () {
        expect(formatBuildLabel(value)).to.equal('')
      })
    })

    forNonStrings((value, friendlyName) => {
      it(`should return empty string for invalid value ${friendlyName}`, function () {
        expect(formatBuildLabel(value)).to.equal('')
      })
    })

    it('should add a # to numbers', function () {
      expect(formatBuildLabel('1234')).to.equal('#1234')
    })

    it('should trim the build label to given length', function () {
      expect(formatBuildLabel('abcdefghijklmnopqrstuvwxyz', 3)).to.equal('abc')
    })

    it('should trim the build label to 10 characters by default', function () {
      expect(formatBuildLabel('abcdefghijklmnopqrstuvwxyz')).to.equal('abcdefghij')
    })
  })

  describe('is sick', function () {
    it('should be true when sick', function () {
      expect(isSick(PROGNOSIS_SICK)).to.be.true()
    })

    const otherPrognosis = [
      PROGNOSIS_UNKNOWN,
      PROGNOSIS_HEALTHY_BUILDING,
      PROGNOSIS_SICK_BUILDING
    ]

    otherPrognosis.forEach((value) => {
      it(`should be false for value ${value}`, function () {
        expect(isSick(value)).to.be.false()
      })
    })

    forUndisplayablesStrings((value, friendlyName) => {
      it(`should be false for invalid value ${friendlyName}`, function () {
        expect(isSick(value)).to.be.false()
      })
    })

    forNonStrings((value, friendlyName) => {
      it(`should be false for invalid value ${friendlyName}`, function () {
        expect(isSick(value)).to.be.false()
      })
    })
  })

  describe('is building', function () {
    it('should be true when healthy building', function () {
      expect(isBuilding(PROGNOSIS_HEALTHY_BUILDING)).to.be.true()
    })

    it('should be true when sick building', function () {
      expect(isBuilding(PROGNOSIS_SICK_BUILDING)).to.be.true()
    })

    const otherPrognosis = [
      PROGNOSIS_UNKNOWN,
      PROGNOSIS_SICK
    ]

    otherPrognosis.forEach((value) => {
      it(`should be false for value ${value}`, function () {
        expect(isBuilding(value)).to.be.false()
      })
    })

    forUndisplayablesStrings((value, friendlyName) => {
      it(`should be false for invalid value ${friendlyName}`, function () {
        expect(isSick(value)).to.be.false()
      })
    })

    forNonStrings((value, friendlyName) => {
      it(`should be false for invalid value ${friendlyName}`, function () {
        expect(isSick(value)).to.be.false()
      })
    })
  })
})
