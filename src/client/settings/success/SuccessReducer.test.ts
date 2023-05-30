import {
  addMessage,
  getSuccessBackgroundColour,
  getSuccessMessages,
  getSuccessTextColour,
  reducer as successReducer,
  removeMessage,
  setSuccessBackgroundColour,
  setSuccessTextColour,
  successRoot,
  SuccessState,
} from './SuccessReducer'
import { testReducer } from '../../testUtils/testHelpers'
import { buildState } from '../../testUtils/builders'
import { configurationImported } from '../backup/BackupActionCreators'
import { RecursivePartial } from '../../common/Types'

const reducer = testReducer({
  [successRoot]: successReducer,
})

function state(existing?: RecursivePartial<SuccessState>) {
  return buildState({ [successRoot]: existing })
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state({ messages: ['some-state'] })
  const newState = reducer(existingState, { type: 'not-a-real-action' })
  expect(newState).toEqual(existingState)
})

describe(configurationImported.toString(), () => {
  it('should merge the success data', () => {
    const existingState = state({
      messages: ['old'],
      backgroundColour: 'a',
      textColour: 'b',
    })
    const action = configurationImported({
      success: { messages: ['new'], backgroundColour: 'c', textColour: 'd' },
    })
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['new'])
    expect(getSuccessBackgroundColour(newState)).toEqual('c')
    expect(getSuccessTextColour(newState)).toEqual('d')
  })

  it('should handle no success data', () => {
    const existingState = state({ messages: ['old'] })
    const action = configurationImported({})
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['old'])
  })
})

describe(addMessage.toString(), () => {
  it('should add the given message', () => {
    const existingState = state({ messages: [] })
    const action = addMessage('some-message')
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['some-message'])
  })

  it('should not add the same message multiple times', () => {
    const existingState = state({ messages: ['some-message'] })
    const action = addMessage('some-message')
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toHaveLength(1)
  })

  it("should replace spaces with non-breaking spaces in emoticons so they don't get wrapped on the monitor page", () => {
    const existingState = state({ messages: [] })
    const action = addMessage('(*＾3＾) /～♡')
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['(*＾3＾)\xa0/～♡'])
  })

  it('should not replace spaces in sentences so they do get wrapped on the monitor page', () => {
    const existingState = state({ messages: [] })
    const action = addMessage('nevergreen is awesome')
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['nevergreen is awesome'])
  })
})

describe(removeMessage.toString(), () => {
  it('should remove the given message', () => {
    const existingState = state({ messages: ['a', 'b', 'c'] })
    const action = removeMessage('b')
    const newState = reducer(existingState, action)
    expect(getSuccessMessages(newState)).toEqual(['a', 'c'])
  })
})

describe(setSuccessBackgroundColour.toString(), () => {
  it('should set the background colour', () => {
    const existingState = state({ backgroundColour: 'a' })
    const action = setSuccessBackgroundColour('b')
    const newState = reducer(existingState, action)
    expect(getSuccessBackgroundColour(newState)).toEqual('b')
  })
})

describe(setSuccessTextColour.toString(), () => {
  it('should set the text colour', () => {
    const existingState = state({ textColour: 'a' })
    const action = setSuccessTextColour('b')
    const newState = reducer(existingState, action)
    expect(getSuccessTextColour(newState)).toEqual('b')
  })
})
