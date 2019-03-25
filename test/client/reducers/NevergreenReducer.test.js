import {reduce} from '../../../src/client/reducers/NevergreenReducer'
import {FULL_SCREEN, INITIALISED, INITIALISING, REQUEST_FULL_SCREEN} from '../../../src/client/actions/Actions'
import {Map} from 'immutable'

describe('NevergreenReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISING, () => {

    test('should set the loaded property', () => {
      const existingState = Map({loaded: true})
      const action = {type: INITIALISING}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('loaded', false)
    })
  })

  describe(INITIALISED, () => {

    test('should set the loaded property', () => {
      const existingState = Map({loaded: false})
      const action = {type: INITIALISED, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('loaded', true)
    })

    test('should merge the nevergreen data', () => {
      const existingState = Map()
      const action = {type: INITIALISED, data: Map({nevergreen: {foo: 'bar'}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('foo', 'bar')
    })
  })

  describe(FULL_SCREEN, () => {

    test('should set the full screen property', () => {
      const existingState = Map({fullScreen: false})
      const action = {type: FULL_SCREEN, enabled: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('fullScreen', true)
    })
  })

  describe(REQUEST_FULL_SCREEN, () => {

    test('should set the full screen requested property', () => {
      const existingState = Map({fullScreenRequested: false})
      const action = {type: REQUEST_FULL_SCREEN, requested: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('fullScreenRequested', true)
    })
  })
})
