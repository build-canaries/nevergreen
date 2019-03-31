import {reduce, SUCCESS_ROOT} from '../../../src/client/reducers/SuccessReducer'
import {IMPORT_SUCCESS, INITIALISED, MESSAGE_ADDED, MESSAGE_REMOVED} from '../../../src/client/actions/Actions'
import {Map, OrderedSet} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {getSuccessMessages} from '../../../src/client/reducers/Selectors'
import {initalised} from '../../../src/client/actions/NevergreenActionCreators'
import {importSuccess} from '../../../src/client/actions/ImportActionCreators'
import {addMessage, removeMessage} from '../../../src/client/actions/SuccessActionCreators'

describe('SuccessReducer', () => {

  const reducer = combineReducers({
    [SUCCESS_ROOT]: reduce
  })

  function state(existing) {
    return Map({[SUCCESS_ROOT]: OrderedSet(existing)})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state(['some-state'])
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should set the success data', () => {
      const existingState = state(['old-message'])
      const action = initalised({[SUCCESS_ROOT]: ['some-message']})
      const newState = reducer(existingState, action)
      expect(getSuccessMessages(newState).toJS()).toEqual(['some-message'])
    })

    test('should handle no success data', () => {
      const existingState = state([])
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(getSuccessMessages(newState).toJS()).toHaveLength(0)
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should merge the success data', () => {
      const existingState = state([])
      const action = importSuccess({success: ['some-message']})
      const newState = reducer(existingState, action)
      expect(getSuccessMessages(newState).toJS()).toEqual(['some-message'])
    })
  })

  describe(MESSAGE_ADDED, () => {

    test('should add the given message', () => {
      const existingState = state([])
      const action = addMessage('some-message')
      const newState = reducer(existingState, action)
      expect(getSuccessMessages(newState).toJS()).toEqual(['some-message'])
    })

    test('should not add the same message multiple times', () => {
      const existingState = state(['some-message'])
      const action = addMessage('some-message')
      const newState = reducer(existingState, action)
      expect(getSuccessMessages(newState).toJS()).toHaveLength(1)
    })
  })

  describe(MESSAGE_REMOVED, () => {

    test('should remove the given message', () => {
      const existingState = state(['a', 'b', 'c'])
      const action = removeMessage('b')
      const newState = reducer(existingState, action)
      expect(getSuccessMessages(newState).toJS()).toEqual(['a', 'c'])
    })
  })
})
