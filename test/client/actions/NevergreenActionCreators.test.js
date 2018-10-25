import {describe, it} from 'mocha'
import {expect} from 'chai'
import {
  FULL_SCREEN,
  INITIALISED,
  INITIALISING,
  NAVIGATED,
  REQUEST_FULL_SCREEN
} from '../../../src/client/actions/Actions'
import {
  enableFullScreen,
  initalised,
  initalising,
  navigated,
  requestFullScreen
} from '../../../src/client/actions/NevergreenActionCreators'

describe('NevergreenActionCreators', function () {

  describe(INITIALISING, function () {

    it('should return the correct type', function () {
      const actual = initalising({foo: 'bar'})
      expect(actual).to.have.property('type', INITIALISING)
    })
  })

  describe(INITIALISED, function () {

    it('should return the correct type', function () {
      const actual = initalised()
      expect(actual).to.have.property('type', INITIALISED)
    })

    it('should return the configuration', function () {
      const actual = initalised({foo: 'bar'})
      expect(actual).to.have.property('data').that.contains.property('foo', 'bar')
    })
  })

  describe(NAVIGATED, function () {

    it('should return the correct type', function () {
      const actual = navigated()
      expect(actual).to.have.property('type', NAVIGATED)
    })
  })

  describe(FULL_SCREEN, function () {

    it('should return the correct type', function () {
      const actual = enableFullScreen()
      expect(actual).to.have.property('type', FULL_SCREEN)
    })

    it('should return the enabled flag', function () {
      const actual = enableFullScreen(true)
      expect(actual).to.have.property('enabled', true)
    })
  })

  describe(REQUEST_FULL_SCREEN, function () {

    it('should return the correct type', function () {
      const actual = requestFullScreen()
      expect(actual).to.have.property('type', REQUEST_FULL_SCREEN)
    })

    it('should return the requested flag', function () {
      const actual = requestFullScreen(true)
      expect(actual).to.have.property('requested', true)
    })
  })
})
