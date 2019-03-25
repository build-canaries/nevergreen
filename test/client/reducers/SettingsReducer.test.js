import {reduce} from '../../../src/client/reducers/SettingsReducer'
import {
  BROKEN_BUILD_SOUND_FX,
  CLICK_TO_SHOW_MENU,
  IMPORT_SUCCESS,
  INITIALISED,
  PLAY_BROKEN_BUILD_SOUND_FX,
  REFRESH_TIME,
  REQUESTING_SYSTEM_NOTIFICATION_PERMISSION,
  SET_MAX_PROJECTS,
  SHOW_BROKEN_BUILD_TIME,
  SHOW_BUILD_TIME,
  SHOW_SYSTEM_NOTIFICATIONS,
  SHOW_TRAY_NAME,
  SYSTEM_NOTIFICATIONS_PERMISSION_DENIED
} from '../../../src/client/actions/Actions'
import {fromJS, Map} from 'immutable'

describe('SettingsReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should merge show tray name', () => {
      const existingState = Map({showTrayName: false})
      const action = {type: INITIALISED, data: fromJS({audioVisual: {showTrayName: true}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showTrayName', true)
    })

    test('should merge build timers enabled', () => {
      const existingState = Map({showBuildTime: false})
      const action = {type: INITIALISED, data: fromJS({audioVisual: {showBuildTime: true}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showBuildTime', true)
    })

    test('should merge broken build timers enabled', () => {
      const existingState = Map({showBrokenBuildTime: false})
      const action = {type: INITIALISED, data: fromJS({audioVisual: {showBrokenBuildTime: true}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showBrokenBuildTime', true)
    })

    test('should merge broken build sounds enabled', () => {
      const existingState = Map({playBrokenBuildSoundFx: false})
      const action = {type: INITIALISED, data: fromJS({audioVisual: {playBrokenBuildSoundFx: true}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('playBrokenBuildSoundFx', true)
    })

    test('should merge broken build sound fx', () => {
      const existingState = Map({brokenBuildSoundFx: 'some-url'})
      const action = {type: INITIALISED, data: fromJS({audioVisual: {brokenBuildSoundFx: 'another-url'}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('brokenBuildSoundFx', 'another-url')
    })

    test('should merge refresh time', () => {
      const existingState = Map({refreshTime: 5})
      const action = {type: INITIALISED, data: fromJS({audioVisual: {refreshTime: 10}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('refreshTime', 10)
    })

    test('should merge show build label', () => {
      const existingState = Map({showBuildLabel: false})
      const action = {type: INITIALISED, data: fromJS({audioVisual: {showBuildLabel: true}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showBuildLabel', true)
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should merge show tray name', () => {
      const existingState = Map({showTrayName: false})
      const action = {type: IMPORT_SUCCESS, data: fromJS({audioVisual: {showTrayName: true}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showTrayName', true)
    })

    test('should merge build timers enabled', () => {
      const existingState = Map({showBuildTime: false})
      const action = {type: IMPORT_SUCCESS, data: fromJS({audioVisual: {showBuildTime: true}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showBuildTime', true)
    })

    test('should merge broken build timers enabled', () => {
      const existingState = Map({showBrokenBuildTime: false})
      const action = {type: IMPORT_SUCCESS, data: fromJS({audioVisual: {showBrokenBuildTime: true}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showBrokenBuildTime', true)
    })

    test('should merge broken build sounds enabled', () => {
      const existingState = Map({playBrokenBuildSoundFx: false})
      const action = {type: IMPORT_SUCCESS, data: fromJS({audioVisual: {playBrokenBuildSoundFx: true}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('playBrokenBuildSoundFx', true)
    })

    test('should merge broken build sound fx', () => {
      const existingState = Map({brokenBuildSoundFx: 'some-url'})
      const action = {type: IMPORT_SUCCESS, data: fromJS({audioVisual: {brokenBuildSoundFx: 'another-url'}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('brokenBuildSoundFx', 'another-url')
    })

    test('should merge show build label', () => {
      const existingState = Map({showBuildLabel: false})
      const action = {type: IMPORT_SUCCESS, data: fromJS({audioVisual: {showBuildLabel: true}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showBuildLabel', true)
    })
  })

  describe(SHOW_BUILD_TIME, () => {

    test('should set the broken build timer enabled property', () => {
      const existingState = Map({showBuildTime: false})
      const action = {type: SHOW_BUILD_TIME, value: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showBuildTime', true)
    })
  })

  describe(SHOW_BROKEN_BUILD_TIME, () => {

    test('should set the broken build timer enabled property', () => {
      const existingState = Map({showBrokenBuildTime: false})
      const action = {type: SHOW_BROKEN_BUILD_TIME, value: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showBrokenBuildTime', true)
    })
  })

  describe(PLAY_BROKEN_BUILD_SOUND_FX, () => {

    test('should set the broken build sounds enabled property', () => {
      const existingState = Map({playBrokenBuildSoundFx: false})
      const action = {type: PLAY_BROKEN_BUILD_SOUND_FX, value: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('playBrokenBuildSoundFx', true)
    })
  })

  describe(BROKEN_BUILD_SOUND_FX, () => {

    test('should set the broken build sound fx property', () => {
      const existingState = Map({brokenBuildSoundFx: 'some-url'})
      const action = {type: BROKEN_BUILD_SOUND_FX, value: 'another-url'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('brokenBuildSoundFx', 'another-url')
    })
  })

  describe(SHOW_TRAY_NAME, () => {

    test('should set the tray name toggled property', () => {
      const existingState = Map({showTrayName: false})
      const action = {type: SHOW_TRAY_NAME, value: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showTrayName', true)
    })
  })

  describe(REFRESH_TIME, () => {

    test('should set the refresh time property', () => {
      const existingState = Map({refreshTime: 5})
      const action = {type: REFRESH_TIME, value: 10}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('refreshTime', 10)
    })
  })

  describe(REQUESTING_SYSTEM_NOTIFICATION_PERMISSION, () => {

    test('should set the system notification requesting permission property', () => {
      const existingState = Map({systemNotificationRequestingPermission: false})
      const action = {type: REQUESTING_SYSTEM_NOTIFICATION_PERMISSION, value: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('systemNotificationRequestingPermission', true)
    })
  })

  describe(SHOW_SYSTEM_NOTIFICATIONS, () => {

    test('should set the show browser notifications property', () => {
      const existingState = Map({showSystemNotifications: false})
      const action = {type: SHOW_SYSTEM_NOTIFICATIONS, value: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('showSystemNotifications', true)
    })

    test('should reset the system notification permission denied property', () => {
      const existingState = Map({systemNotificationPermissionDenied: true})
      const action = {type: SHOW_SYSTEM_NOTIFICATIONS, value: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('systemNotificationPermissionDenied', false)
    })

    test('should reset the system notification requesting permission property', () => {
      const existingState = Map({systemNotificationRequestingPermission: true})
      const action = {type: SHOW_SYSTEM_NOTIFICATIONS, value: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('systemNotificationRequestingPermission', false)
    })
  })

  describe(SYSTEM_NOTIFICATIONS_PERMISSION_DENIED, () => {

    test('should set the system notification permission denied property', () => {
      const existingState = Map({systemNotificationPermissionDenied: false})
      const action = {type: SYSTEM_NOTIFICATIONS_PERMISSION_DENIED}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('systemNotificationPermissionDenied', true)
    })

    test('should reset the system notification requesting permission property', () => {
      const existingState = Map({systemNotificationRequestingPermission: true})
      const action = {type: SYSTEM_NOTIFICATIONS_PERMISSION_DENIED}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('systemNotificationRequestingPermission', false)
    })
  })

  describe(SET_MAX_PROJECTS, () => {

    test('should set the max projects to show property', () => {
      const existingState = Map({maxProjectsToShow: 9})
      const action = {type: SET_MAX_PROJECTS, value: 12}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('maxProjectsToShow', 12)
    })
  })

  describe(CLICK_TO_SHOW_MENU, () => {

    test('should set the click to show menu property', () => {
      const existingState = Map({clickToShowMenu: false})
      const action = {type: CLICK_TO_SHOW_MENU, value: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('clickToShowMenu', true)
    })
  })
})
