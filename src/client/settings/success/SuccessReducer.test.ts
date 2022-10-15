import {getSuccessMessages, reduce, SUCCESS_ROOT, SuccessState} from './SuccessReducer'
import {Actions} from '../../Actions'
import {addMessage, removeMessage} from './SuccessActionCreators'
import {buildState, testReducer} from '../../testUtils/testHelpers'
import {configurationImported} from '../backup/BackupActionCreators'

const reducer = testReducer({
  [SUCCESS_ROOT]: reduce
})

function state(existing?: SuccessState) {
  return buildState({[SUCCESS_ROOT]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state(['some-state'])
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(Actions.CONFIGURATION_IMPORTED, () => {

  it('should merge the success data', () => {
    const existingState = state([])
    const action = configurationImported({success: ['some-message']})
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['some-message'])
  })

  it('should handle no success data', () => {
    const existingState = state([])
    const action = configurationImported({})
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toHaveLength(0)
  })
})

describe(Actions.MESSAGE_ADDED, () => {

  it('should add the given message', () => {
    const existingState = state([])
    const action = addMessage('some-message')
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['some-message'])
  })

  it('should not add the same message multiple times', () => {
    const existingState = state(['some-message'])
    const action = addMessage('some-message')
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toHaveLength(1)
  })
})

describe(Actions.MESSAGE_REMOVED, () => {

  it('should remove the given message', () => {
    const existingState = state(['a', 'b', 'c'])
    const action = removeMessage('b')
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['a', 'c'])
  })
})
