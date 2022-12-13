import {
  getAllowAudioNotifications,
  getAllowSystemNotifications,
  personalSettingsRoot,
  PersonalSettingsState,
  reducer as personalSettingsReducer,
  setAllowAudioNotifications,
  setAllowSystemNotifications,
} from './PersonalSettingsReducer'
import { testReducer } from '../testUtils/testHelpers'
import { buildState } from '../testUtils/builders'
import { RecursivePartial } from '../common/Types'
import { configurationImported } from './backup/BackupActionCreators'

const reducer = testReducer({
  [personalSettingsRoot]: personalSettingsReducer,
})

function state(existing?: RecursivePartial<PersonalSettingsState>) {
  return buildState({ [personalSettingsRoot]: existing })
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, { type: 'not-a-real-action' })
  expect(newState).toEqual(existingState)
})

describe(configurationImported.toString(), () => {
  it('should overwrite any included state', () => {
    const existingState = state({
      allowAudioNotifications: false,
      allowSystemNotifications: false,
    })
    const action = configurationImported({
      [personalSettingsRoot]: {
        allowAudioNotifications: true,
        allowSystemNotifications: true,
      },
    })
    const newState = reducer(existingState, action)
    expect(getAllowAudioNotifications(newState)).toBeTruthy()
    expect(getAllowSystemNotifications(newState)).toBeTruthy()
  })
})

describe(setAllowAudioNotifications.toString(), () => {
  it('should set the broken build sounds enabled property', () => {
    const existingState = state({ allowAudioNotifications: false })
    const action = setAllowAudioNotifications(true)
    const newState = reducer(existingState, action)
    expect(getAllowAudioNotifications(newState)).toBeTruthy()
  })
})

describe(setAllowSystemNotifications.toString(), () => {
  it('should set the show browser notifications property', () => {
    const existingState = state({ allowSystemNotifications: false })
    const action = setAllowSystemNotifications(true)
    const newState = reducer(existingState, action)
    expect(getAllowSystemNotifications(newState)).toBeTruthy()
  })
})
