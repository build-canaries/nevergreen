import {
  getEnableNewVersionCheck,
  notificationsRoot,
  NotificationsState,
  reducer as notificationsReducer,
  toggleVersionCheck,
} from './NotificationsReducer'
import { testReducer } from '../../testUtils/testHelpers'
import { buildState } from '../../testUtils/builders'
import { RecursivePartial } from '../../common/Types'
import { configurationImported } from '../backup/BackupActionCreators'

const reducer = testReducer({
  [notificationsRoot]: notificationsReducer,
})

function state(existing?: RecursivePartial<NotificationsState>) {
  return buildState({ [notificationsRoot]: existing })
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, { type: 'not-a-real-action' })
  expect(newState).toEqual(existingState)
})

describe(configurationImported.toString(), () => {
  it('should overwrite any included state', () => {
    const existingState = state({
      enableNewVersionCheck: false,
    })
    const action = configurationImported({
      [notificationsRoot]: {
        enableNewVersionCheck: true,
      },
    })
    const newState = reducer(existingState, action)
    expect(getEnableNewVersionCheck(newState)).toBeTruthy()
  })

  it('should not overwrite any missing state', () => {
    const existingState = state({
      enableNewVersionCheck: true,
    })
    const action = configurationImported({ [notificationsRoot]: {} })
    const newState = reducer(existingState, action)
    expect(getEnableNewVersionCheck(newState)).toBeTruthy()
  })
})

describe(toggleVersionCheck.toString(), () => {
  it('should toggle the version check property', () => {
    const existingState = state({ enableNewVersionCheck: true })
    const action = toggleVersionCheck()
    const newState = reducer(existingState, action)
    expect(getEnableNewVersionCheck(newState)).toBeFalsy()
  })
})
