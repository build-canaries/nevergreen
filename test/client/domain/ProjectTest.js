import {expect} from 'chai'
import {describe, it} from 'mocha'
import {
  formatBuildLabel,
  isBuilding,
  isSick,
  PROGNOSIS_HEALTHY_BUILDING,
  PROGNOSIS_SICK,
  PROGNOSIS_SICK_BUILDING,
  PROGNOSIS_UNKNOWN
} from '../../../src/client/domain/Project'
import {forNonStrings, forUndisplayableStrings} from '../TestUtils'

describe('Project', function () {

  describe('formatBuildLabel', function () {

    forUndisplayableStrings((value, friendlyName) => {
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

  describe('isSick', function () {

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

    forUndisplayableStrings((value, friendlyName) => {
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

  describe('isBuilding', function () {

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

    forUndisplayableStrings((value, friendlyName) => {
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
