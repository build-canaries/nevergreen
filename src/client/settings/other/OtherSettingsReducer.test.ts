import type { RecursivePartial } from '../../common/Types'
import {
  getClickToShowMenu,
  otherSettingsRoot,
  OtherSettingsState,
  reducer as settingsReducer,
  setClickToShowMenu,
} from './OtherSettingsReducer'
import { testReducer } from '../../testUtils/testHelpers'
import { buildState } from '../../testUtils/builders'
import { configurationImported } from '../backup/BackupActionCreators'

const reducer = testReducer({
  [otherSettingsRoot]: settingsReducer,
})

function state(existing?: RecursivePartial<OtherSettingsState>) {
  return buildState({ [otherSettingsRoot]: existing })
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, { type: 'not-a-real-action' })
  expect(newState).toEqual(existingState)
})

describe(configurationImported.toString(), () => {
  it('should merge click to show menu', () => {
    const existingState = state({ clickToShowMenu: false })
    const action = configurationImported({
      [otherSettingsRoot]: { clickToShowMenu: true },
    })
    const newState = reducer(existingState, action)
    expect(getClickToShowMenu(newState)).toBeTruthy()
  })
})

describe(setClickToShowMenu.toString(), () => {
  it('should set the click to show menu property', () => {
    const existingState = state({ clickToShowMenu: false })
    const action = setClickToShowMenu(true)
    const newState = reducer(existingState, action)
    expect(getClickToShowMenu(newState)).toBeTruthy()
  })
})
