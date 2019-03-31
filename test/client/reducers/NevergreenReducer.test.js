import {NEVERGREEN_ROOT, reduce} from '../../../src/client/reducers/NevergreenReducer'
import {FULL_SCREEN, INITIALISED, INITIALISING, REQUEST_FULL_SCREEN} from '../../../src/client/actions/Actions'
import {fromJS} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {getFullScreen, getFullScreenRequested, getLoaded} from '../../../src/client/reducers/Selectors'
import {initalised, initalising} from '../../../src/client/actions/NevergreenActionCreators'

describe('NevergreenReducer', () => {

  const reducer = combineReducers({
    [NEVERGREEN_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[NEVERGREEN_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISING, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: true})
      const action = initalising()
      const newState = reducer(existingState, action)
      expect(getLoaded(newState)).toBeFalsy()
    })
  })

  describe(INITIALISED, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: false})
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(getLoaded(newState)).toBeTruthy()
    })

    test('should merge the nevergreen data', () => {
      const existingState = state({})
      const action = initalised({[NEVERGREEN_ROOT]: {foo: 'bar'}})
      const newState = reducer(existingState, action)
      expect(newState.get(NEVERGREEN_ROOT).toJS()).toHaveProperty('foo', 'bar')
    })
  })

  describe(FULL_SCREEN, () => {

    test('should set the full screen property', () => {
      const existingState = state({fullScreen: false})
      const action = {type: FULL_SCREEN, enabled: true}
      const newState = reducer(existingState, action)
      expect(getFullScreen(newState)).toBeTruthy()
    })
  })

  describe(REQUEST_FULL_SCREEN, () => {

    test('should set the full screen requested property', () => {
      const existingState = state({fullScreenRequested: false})
      const action = {type: REQUEST_FULL_SCREEN, requested: true}
      const newState = reducer(existingState, action)
      expect(getFullScreenRequested(newState)).toBeTruthy()
    })
  })
})
