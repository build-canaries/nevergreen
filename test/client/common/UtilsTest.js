import {describe, it} from 'mocha'
import {expect} from 'chai'
import {isBlank, isNumber} from '../../../src/client/common/Utils'
import {forNonStrings} from '../TestUtils'

describe('Utils', function () {

  describe('isNumber', function () {

    it('should know when it sees a number', function () {
      expect(isNumber(0)).to.be.true()
    })

    it('should treat a numeric string as a number', function () {
      expect(isNumber('1')).to.be.true()
    })

    it('should know null is not a number', function () {
      expect(isNumber(null)).to.be.false()
    })

    it('should know undefined is not a number', function () {
      expect(isNumber(undefined)).to.be.false()
    })

    it('should know a blank string is not a number', function () {
      expect(isNumber(' ')).to.be.false()
    })
  })

  describe('isBlank', function () {

    it('should treat null as blank', function () {
      expect(isBlank(null)).to.be.true()
    })

    it('should treat undefined as blank', function () {
      expect(isBlank(undefined)).to.be.true()
    })

    it('should treat an empty string as blank', function () {
      expect(isBlank('')).to.be.true()
    })

    it('should treat a whitespace only string as blank', function () {
      expect(isBlank('   ')).to.be.true()
    })

    it('should not treat a string with non whitespace characters as blank', function () {
      expect(isBlank('test')).to.be.false()
    })

    it('should not treat a string with mixed characters as blank', function () {
      expect(isBlank(' t e s t ')).to.be.false()
    })

    forNonStrings((val, friendlyName) => {
      it(`should treat non string value ${friendlyName} as blank`, function () {
        expect(isBlank(val)).to.be.true()
      })
    })
  })
})
