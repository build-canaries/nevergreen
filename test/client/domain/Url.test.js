import {expect} from 'chai'
import {describe, it} from 'mocha'
import {ensureHasScheme, hasScheme, removeScheme} from '../../../src/client/domain/Url'

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

  describe('ensureHasScheme', function () {

    it('should do nothing if the url already has a scheme', function () {
      expect(ensureHasScheme('ftp://some-url')).to.equal('ftp://some-url')
    })

    it('should add the default scheme if it is missing', function () {
      expect(ensureHasScheme('some-url')).to.equal('http://some-url')
    })

    it('should add the default scheme if it is missing and the user added started slashes', function () {
      expect(ensureHasScheme('//some-url')).to.equal('http://some-url')
    })
  })
})
