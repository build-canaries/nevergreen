import {reduce} from '../../../src/client/reducers/ImportReducer'
import {IMPORT_ERROR, IMPORT_SUCCESS, IMPORTING, NAVIGATED} from '../../../src/client/actions/Actions'
import {List, Map} from 'immutable'

describe('ImportReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = Map({foo: 'bar'})
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(IMPORTING, () => {

    test('should set the loaded property', () => {
      const existingState = Map({loaded: true})
      const action = {type: IMPORTING}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('loaded', false)
    })

    test('should delete the infos property', () => {
      const existingState = Map({infos: Map()})
      const action = {type: IMPORTING}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('infos')
    })

    test('should delete the errors property', () => {
      const existingState = Map({errors: Map()})
      const action = {type: IMPORTING}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('errors')
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should set the loaded property', () => {
      const existingState = Map({loaded: false})
      const action = {type: IMPORT_SUCCESS, messages: List()}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('loaded', true)
    })

    test('should set the infos property', () => {
      const existingState = Map()
      const action = {type: IMPORT_SUCCESS, messages: List(['some-message'])}
      const newState = reduce(existingState, action)
      expect(newState.toJS().infos).toEqual(['some-message'])
    })

    test('should delete the errors property', () => {
      const existingState = Map({errors: Map()})
      const action = {type: IMPORT_SUCCESS}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('errors')
    })
  })

  describe(IMPORT_ERROR, () => {

    test('should set the loaded property', () => {
      const existingState = Map({loaded: false})
      const action = {type: IMPORT_ERROR}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('loaded', true)
    })

    test('should delete the infos property', () => {
      const existingState = Map({infos: Map()})
      const action = {type: IMPORT_ERROR}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('infos')
    })

    test('should set the errors property', () => {
      const existingState = Map()
      const action = {type: IMPORT_ERROR, errors: List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState.toJS().errors).toEqual(['some-error'])
    })
  })

  describe(NAVIGATED, () => {

    test('should delete the infos property', () => {
      const existingState = Map({infos: Map()})
      const action = {type: NAVIGATED}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('infos')
    })

    test('should delete the errors property', () => {
      const existingState = Map({errors: Map()})
      const action = {type: NAVIGATED}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('errors')
    })
  })
})
