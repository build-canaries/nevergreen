import {
  addNotification,
  getAllowAudioNotifications,
  getAllowSystemNotifications,
  getEnableNewVersionCheck,
  getNotifications,
  notificationsRoot,
  NotificationsState,
  reducer as notificationsReducer,
  removeNotification,
  setAllowAudioNotifications,
  setAllowSystemNotifications,
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
      allowAudioNotifications: false,
      allowSystemNotifications: false,
      enableNewVersionCheck: false,
      notifications: {},
    })
    const action = configurationImported({
      [notificationsRoot]: {
        allowAudioNotifications: true,
        allowSystemNotifications: true,
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
    expect(getAllowAudioNotifications(newState)).toBeTruthy()
    expect(getAllowSystemNotifications(newState)).toBeTruthy()
    expect(getEnableNewVersionCheck(newState)).toBeTruthy()
    expect(getNotifications(newState)).toEqual({
      [Prognosis.sick]: { systemNotification: false, sfx: 'sick-sfx' },
    })
  })

  it('should not overwrite any missing state', () => {
    const existingState = state({
      allowAudioNotifications: true,
      allowSystemNotifications: true,
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
    expect(getAllowAudioNotifications(newState)).toBeTruthy()
    expect(getAllowSystemNotifications(newState)).toBeTruthy()
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
