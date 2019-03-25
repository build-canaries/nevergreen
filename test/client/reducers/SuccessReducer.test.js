import {reduce} from '../../../src/client/reducers/SuccessReducer'
import {IMPORT_SUCCESS, INITIALISED, MESSAGE_ADDED, MESSAGE_REMOVED} from '../../../src/client/actions/Actions'
import {fromJS, Map, OrderedSet} from 'immutable'

describe('SuccessReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should set the success data', () => {
      const existingState = OrderedSet(['old-message'])
      const action = {type: INITIALISED, data: fromJS({success: ['some-message']})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toEqual(expect.arrayContaining(['some-message']))
    })

    test('should handle no success data', () => {
      const existingState = OrderedSet()
      const action = {type: INITIALISED, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveLength(0)
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should merge the success data', () => {
      const existingState = OrderedSet()
      const action = {type: IMPORT_SUCCESS, data: fromJS({success: ['some-message']})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toEqual(expect.arrayContaining(['some-message']))
    })
  })

  describe(MESSAGE_ADDED, () => {

    test('should add the given message', () => {
      const existingState = OrderedSet()
      const action = {type: MESSAGE_ADDED, message: 'some-message'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toEqual(expect.arrayContaining(['some-message']))
    })

    test('should not add the same message multiple times', () => {
      const existingState = OrderedSet(['some-message'])
      const action = {type: MESSAGE_ADDED, message: 'some-message'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveLength(1)
    })
  })

  describe(MESSAGE_REMOVED, () => {

    test('should remove the given message', () => {
      const existingState = OrderedSet(['a', 'b', 'c'])
      const action = {type: MESSAGE_REMOVED, message: 'b'}
      const newState = reduce(existingState, action)
      expect(newState).toEqual(OrderedSet(['a', 'c']))
    })
  })
})
