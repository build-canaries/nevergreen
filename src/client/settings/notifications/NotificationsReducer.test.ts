import {
  getNotifications,
  getAllowAudioNotifications,
  getAllowSystemNotifications,
  getToggleVersionCheck,
  NOTIFICATIONS_ROOT,
  NotificationsState,
  reduce,
} from './NotificationsReducer'
import {Actions} from '../../Actions'
import {
  addNotification,
  removeNotification,
  setAllowAudioNotifications,
  setAllowSystemNotifications,
  toggleVersionCheck
} from './NotificationsActionCreators'
import {testReducer} from '../../testUtils/testHelpers'
import {buildState} from '../../testUtils/builders'
import {RecursivePartial} from '../../common/Types'
import {configurationImported} from '../backup/BackupActionCreators'
import {Prognosis} from '../../domain/Project'

const reducer = testReducer({
  [NOTIFICATIONS_ROOT]: reduce
})

function state(existing?: RecursivePartial<NotificationsState>) {
  return buildState({[NOTIFICATIONS_ROOT]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(Actions.CONFIGURATION_IMPORTED, () => {

  it('should merge broken build sounds enabled', () => {
    const existingState = state({allowAudioNotifications: false})
    const action = configurationImported({[NOTIFICATIONS_ROOT]: {allowAudioNotifications: true}})
    const newState = reducer(existingState, action)
    expect(getAllowAudioNotifications(newState)).toBeTruthy()
  })

  it('should not reset show system notification when imported state does not contain it', () => {
    const existingState = state({allowSystemNotifications: true})
    const action = configurationImported({[NOTIFICATIONS_ROOT]: {}})
    const newState = reducer(existingState, action)
    expect(getAllowSystemNotifications(newState)).toBeTruthy()
  })
})

describe(Actions.TOGGLE_VERSION_CHECK, () => {

  it('should toggle the version check property', () => {
    const existingState = state({enableNewVersionCheck: true})
    const action = toggleVersionCheck()
    const newState = reducer(existingState, action)
    expect(getToggleVersionCheck(newState)).toBeFalsy()
  })
})

describe(Actions.ALLOW_AUDIO_NOTIFICATIONS, () => {

  it('should set the broken build sounds enabled property', () => {
    const existingState = state({allowAudioNotifications: false})
    const action = setAllowAudioNotifications(true)
    const newState = reducer(existingState, action)
    expect(getAllowAudioNotifications(newState)).toBeTruthy()
  })
})

describe(Actions.ALLOW_SYSTEM_NOTIFICATIONS, () => {

  it('should set the show browser notifications property', () => {
    const existingState = state({allowSystemNotifications: false})
    const action = setAllowSystemNotifications(true)
    const newState = reducer(existingState, action)
    expect(getAllowSystemNotifications(newState)).toBeTruthy()
  })
})

describe(Actions.ADD_NOTIFICATION, () => {

  it('should add the notification', () => {
    const existingState = state({notifications: {}})
    const action = addNotification(Prognosis.sick, true, 'some-sfx')
    const newState = reducer(existingState, action)
    expect(getNotifications(newState)).toEqual({
      [Prognosis.sick]: {systemNotification: true, sfx: 'some-sfx'}
    })
  })
})

describe(Actions.REMOVE_NOTIFICATION, () => {

  it('should remove the notification', () => {
    const existingState = state({
      notifications: {
        [Prognosis.sick]: {systemNotification: true, sfx: 'some-sfx'}
      }
    })
    const action = removeNotification(Prognosis.sick)
    const newState = reducer(existingState, action)
    expect(getNotifications(newState)).toEqual({})
  })
})
