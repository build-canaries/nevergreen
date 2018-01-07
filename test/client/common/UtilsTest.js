import {describe, it} from 'mocha'
import {expect} from 'chai'
import {friendlyFormatDuration, isBlank} from '../../../src/client/common/Utils'

describe('Utils', function () {
  describe('is blank', function () {
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
  })

  describe('friendly format duration', function () {
    it('should format anything less than a minute as seconds', function () {
      expect(friendlyFormatDuration(1)).to.equal('1 second')
      expect(friendlyFormatDuration(59)).to.equal('59 seconds')
    })

    it('should format anything less than an hour as minutes', function () {
      expect(friendlyFormatDuration(60)).to.equal('1 minute')
      expect(friendlyFormatDuration(3599)).to.equal('59 minutes')
    })

    it('should format anything less than a day as hours', function () {
      expect(friendlyFormatDuration(3600)).to.equal('1 hour')
      expect(friendlyFormatDuration(86399)).to.equal('23 hours')
    })

    it('should format anything larger as days', function () {
      expect(friendlyFormatDuration(86400)).to.equal('1 day')
      expect(friendlyFormatDuration(216000)).to.equal('2 days')
    })
  })
})
