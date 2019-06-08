import {getSuccessMessages, reduce, SUCCESS_ROOT, SuccessState} from '../../../src/client/reducers/SuccessReducer'
import {Actions} from '../../../src/client/actions/Actions'
import {setConfiguration} from '../../../src/client/actions/NevergreenActionCreators'
import {addMessage, removeMessage} from '../../../src/client/actions/SuccessActionCreators'
import {buildState, testReducer} from '../testHelpers'

describe('SuccessReducer', () => {

  const reducer = testReducer({
    [SUCCESS_ROOT]: reduce
  })

  function state(existing?: SuccessState) {
    return buildState({[SUCCESS_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state(['some-state'])
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(Actions.SET_CONFIGURATION, () => {

    test('should merge the success data', () => {
      const existingState = state([])
      const action = setConfiguration({success: ['some-message']})
      const newState = reducer(existingState, action)
      expect(getSuccessMessages(newState)).toEqual(['some-message'])
    })

    test('should handle no success data', () => {
      const existingState = state([])
      const action = setConfiguration({})
      const newState = reducer(existingState, action)
      expect(getSuccessMessages(newState)).toHaveLength(0)
    })
  })

  describe(Actions.MESSAGE_ADDED, () => {

    test('should add the given message', () => {
      const existingState = state([])
      const action = addMessage('some-message')
      const newState = reducer(existingState, action)
      expect(getSuccessMessages(newState)).toEqual(['some-message'])
    })

    test('should not add the same message multiple times', () => {
      const existingState = state(['some-message'])
      const action = addMessage('some-message')
      const newState = reducer(existingState, action)
      expect(getSuccessMessages(newState)).toHaveLength(1)
    })
  })

  describe(Actions.MESSAGE_REMOVED, () => {

    test('should remove the given message', () => {
      const existingState = state(['a', 'b', 'c'])
      const action = removeMessage('b')
      const newState = reducer(existingState, action)
      expect(getSuccessMessages(newState)).toEqual(['a', 'c'])
    })
  })
})
