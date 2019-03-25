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

describe('NevergreenActionCreators', () => {

  describe(INITIALISING, () => {

    test('should return the correct type', () => {
      const actual = initalising({foo: 'bar'})
      expect(actual).toHaveProperty('type', INITIALISING)
    })
  })

  describe(INITIALISED, () => {

    test('should return the correct type', () => {
      const actual = initalised()
      expect(actual).toHaveProperty('type', INITIALISED)
    })

    test('should return the configuration', () => {
      const actual = initalised({foo: 'bar'})
      expect(actual.data.get('foo')).toEqual('bar')
    })
  })

  describe(NAVIGATED, () => {

    test('should return the correct type', () => {
      const actual = navigated()
      expect(actual).toHaveProperty('type', NAVIGATED)
    })
  })

  describe(FULL_SCREEN, () => {

    test('should return the correct type', () => {
      const actual = enableFullScreen()
      expect(actual).toHaveProperty('type', FULL_SCREEN)
    })

    test('should return the enabled flag', () => {
      const actual = enableFullScreen(true)
      expect(actual).toHaveProperty('enabled', true)
    })
  })

  describe(REQUEST_FULL_SCREEN, () => {

    test('should return the correct type', () => {
      const actual = requestFullScreen()
      expect(actual).toHaveProperty('type', REQUEST_FULL_SCREEN)
    })

    test('should return the requested flag', () => {
      const actual = requestFullScreen(true)
      expect(actual).toHaveProperty('requested', true)
    })
  })
})
