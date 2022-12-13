import {
  addNotification,
  getEnableNewVersionCheck,
  getNotifications,
  notificationsRoot,
  NotificationsState,
  reducer as notificationsReducer,
  removeNotification,
  toggleVersionCheck,
} from './NotificationsReducer'
import { testReducer } from '../../testUtils/testHelpers'
import { buildState } from '../../testUtils/builders'
import { RecursivePartial } from '../../common/Types'
import { configurationImported } from '../backup/BackupActionCreators'
import { Prognosis } from '../../domain/Project'

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
      notifications: {},
    })
    const action = configurationImported({
      [notificationsRoot]: {
        enableNewVersionCheck: true,
        notifications: {
          [Prognosis.sick]: {
            systemNotification: false,
            sfx: 'sick-sfx',
          },
        },
      },
    })
    const newState = reducer(existingState, action)
    expect(getEnableNewVersionCheck(newState)).toBeTruthy()
    expect(getNotifications(newState)).toEqual({
      [Prognosis.sick]: { systemNotification: false, sfx: 'sick-sfx' },
    })
  })

  it('should not overwrite any missing state', () => {
    const existingState = state({
      enableNewVersionCheck: true,
      notifications: {
        [Prognosis.sick]: {
          systemNotification: false,
          sfx: 'sick-sfx',
        },
      },
    })
    const action = configurationImported({ [notificationsRoot]: {} })
    const newState = reducer(existingState, action)
    expect(getEnableNewVersionCheck(newState)).toBeTruthy()
    expect(getNotifications(newState)).toEqual({
      [Prognosis.sick]: { systemNotification: false, sfx: 'sick-sfx' },
    })
  })

  it('should overwrite notifications state with configuration', () => {
    const existingNotification = { systemNotification: false, sfx: 'sick-sfx' }
    const importedNotification = {
      systemNotification: true,
      sfx: 'healthy-sfx',
    }
    const existingState = state({
      notifications: { [Prognosis.sick]: existingNotification },
    })
    const action = configurationImported({
      [notificationsRoot]: {
        notifications: {
          [Prognosis.healthy]: importedNotification,
        },
      },
    })
    const newState = reducer(existingState, action)
    expect(getNotifications(newState)).toEqual({
      [Prognosis.healthy]: importedNotification,
    })
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

describe(addNotification.toString(), () => {
  it('should add the notification', () => {
    const existingState = state({ notifications: {} })
    const action = addNotification({
      prognosis: Prognosis.sick,
      systemNotification: true,
      sfx: 'some-sfx',
    })
    const newState = reducer(existingState, action)
    expect(getNotifications(newState)).toEqual({
      [Prognosis.sick]: { systemNotification: true, sfx: 'some-sfx' },
    })
  })
})

describe(removeNotification.toString(), () => {
  it('should remove the notification', () => {
    const existingState = state({
      notifications: {
        [Prognosis.sick]: { systemNotification: true, sfx: 'some-sfx' },
      },
    })
    const action = removeNotification(Prognosis.sick)
    const newState = reducer(existingState, action)
    expect(getNotifications(newState)).toEqual({})
  })
})
