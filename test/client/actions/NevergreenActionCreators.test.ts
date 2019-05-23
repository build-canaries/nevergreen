import {Actions} from '../../../src/client/actions/Actions'
import {
  enableFullScreen,
  initalised,
  initalising,
  navigated,
  requestFullScreen
} from '../../../src/client/actions/NevergreenActionCreators'
import {buildState} from '../testHelpers'
import {SUCCESS_ROOT} from '../../../src/client/reducers/SuccessReducer'

describe('NevergreenActionCreators', () => {

  describe(Actions.INITIALISING, () => {

    test('should return the correct type', () => {
      const actual = initalising()
      expect(actual).toHaveProperty('type', Actions.INITIALISING)
    })
  })

  describe(Actions.INITIALISED, () => {

    test('should return the correct type', () => {
      const actual = initalised(buildState())
      expect(actual).toHaveProperty('type', Actions.INITIALISED)
    })

    test('should return the configuration', () => {
      const actual = initalised(buildState({[SUCCESS_ROOT]: ['bar']}))
      expect(actual.data).toHaveProperty(SUCCESS_ROOT, ['bar'])
    })
  })

  describe(Actions.NAVIGATED, () => {

    test('should return the correct type', () => {
      const actual = navigated()
      expect(actual).toHaveProperty('type', Actions.NAVIGATED)
    })
  })

  describe(Actions.FULL_SCREEN, () => {

    test('should return the correct type', () => {
      const actual = enableFullScreen(false)
      expect(actual).toHaveProperty('type', Actions.FULL_SCREEN)
    })

    test('should return the enabled flag', () => {
      const actual = enableFullScreen(true)
      expect(actual).toHaveProperty('enabled', true)
    })
  })

  describe(Actions.REQUEST_FULL_SCREEN, () => {

    test('should return the correct type', () => {
      const actual = requestFullScreen(false)
      expect(actual).toHaveProperty('type', Actions.REQUEST_FULL_SCREEN)
    })

    test('should return the requested flag', () => {
      const actual = requestFullScreen(true)
      expect(actual).toHaveProperty('requested', true)
    })
  })
})
