import {
  addMessage,
  getSuccessMessages,
  successRoot,
  reducer as successReducer,
  removeMessage,
  SuccessState,
} from './SuccessReducer'
import { testReducer } from '../../testUtils/testHelpers'
import { buildState } from '../../testUtils/builders'
import { configurationImported } from '../backup/BackupActionCreators'

const reducer = testReducer({
  [successRoot]: successReducer,
})

function state(existing?: SuccessState) {
  return buildState({ [successRoot]: existing })
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state(['some-state'])
  const newState = reducer(existingState, { type: 'not-a-real-action' })
  expect(newState).toEqual(existingState)
})

describe(configurationImported.toString(), () => {
  it('should merge the success data', () => {
    const existingState = state([])
    const action = configurationImported({ success: ['some-message'] })
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

describe(addMessage.toString(), () => {
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

  it("should replace spaces with non-breaking spaces in emoticons so they don't get wrapped on the monitor page", () => {
    const existingState = state([])
    const action = addMessage('(*＾3＾) /～♡')
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['(*＾3＾)\xa0/～♡'])
  })

  it('should not replace spaces in sentences so they do get wrapped on the monitor page', () => {
    const existingState = state([])
    const action = addMessage('nevergreen is awesome')
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['nevergreen is awesome'])
  })
})

describe(removeMessage.toString(), () => {
  it('should remove the given message', () => {
    const existingState = state(['a', 'b', 'c'])
    const action = removeMessage('b')
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['a', 'c'])
  })
})
