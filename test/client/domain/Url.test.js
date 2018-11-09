import {expect} from 'chai'
import {describe, it} from 'mocha'
import {hasScheme, removeScheme} from '../../../src/client/domain/Url'

describe('Url', function () {

  describe('hasScheme', function () {

    it('should return true when there is a scheme', function () {
      expect(hasScheme('http://some-url')).to.be.true()
    })

    it('should return false when there is no scheme', function () {
      expect(hasScheme('some-thing')).to.be.false()
    })

    it('should handle null', function () {
      expect(hasScheme(null)).to.be.false()
    })
  })

  describe('removeScheme', function () {

    it('should remove the scheme', function () {
      expect(removeScheme('http://some-url')).to.equal('//some-url')
    })

    it('should do nothing if there is no scheme', function () {
      expect(removeScheme('some-thing')).to.equal('some-thing')
    })

    it('should handle null', function () {
      expect(removeScheme(null)).to.be.null()
    })
  })
})
