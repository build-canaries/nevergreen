import {NEVERGREEN_ROOT, NevergreenState, reduce} from '../../../src/client/reducers/NevergreenReducer'
import {Actions} from '../../../src/client/actions/Actions'
import {getFullScreen, getFullScreenRequested, getLoaded} from '../../../src/client/reducers/Selectors'
import {initalised, initalising} from '../../../src/client/actions/NevergreenActionCreators'
import {buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'

describe('NevergreenReducer', () => {

  const reducer = testReducer({
    [NEVERGREEN_ROOT]: reduce
  })

  function state(existing?: RecursivePartial<NevergreenState>) {
    return buildState({[NEVERGREEN_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state()
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(Actions.INITIALISING, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: true})
      const action = initalising()
      const newState = reducer(existingState, action)
      expect(getLoaded(newState)).toBeFalsy()
    })
  })

  describe(Actions.INITIALISED, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: false})
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(getLoaded(newState)).toBeTruthy()
    })

    test('should merge the nevergreen data', () => {
      const existingState = state({fullScreen: false})
      const action = initalised({[NEVERGREEN_ROOT]: {fullScreen: true}})
      const newState = reducer(existingState, action)
      expect(getFullScreen(newState)).toBeTruthy()
    })
  })

  describe(Actions.FULL_SCREEN, () => {

    test('should set the full screen property', () => {
      const existingState = state({fullScreen: false})
      const action = {type: Actions.FULL_SCREEN, enabled: true}
      const newState = reducer(existingState, action)
      expect(getFullScreen(newState)).toBeTruthy()
    })
  })

  describe(Actions.REQUEST_FULL_SCREEN, () => {

    test('should set the full screen requested property', () => {
      const existingState = state({fullScreenRequested: false})
      const action = {type: Actions.REQUEST_FULL_SCREEN, requested: true}
      const newState = reducer(existingState, action)
      expect(getFullScreenRequested(newState)).toBeTruthy()
    })
  })
})
