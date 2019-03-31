import {reduce, SETTINGS_ROOT} from '../../../src/client/reducers/SettingsReducer'
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
import {fromJS} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {initalised} from '../../../src/client/actions/NevergreenActionCreators'
import {
  getBrokenBuildSoundFx,
  getClickToShowMenu,
  getSystemNotificationPermissionDenied,
  getMaxProjectsToShow,
  getPlayBrokenBuildSoundFx,
  getRefreshTime,
  getShowBrokenBuildTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowSystemNotifications,
  getShowTrayName,
  getSystemNotificationRequestingPermission
} from '../../../src/client/reducers/Selectors'
import {importSuccess} from '../../../src/client/actions/ImportActionCreators'
import {
  requestingSystemNotificationPermission,
  setBrokenBuildSoundFx,
  setClickToShowMenu,
  setMaxProjectsToShow,
  setPlayBrokenBuildSoundFx,
  setRefreshTime,
  setShowBrokenBuildTime,
  setShowBuildTime,
  setShowSystemNotifications,
  setShowTrayName,
  systemNotificationPermissionDenied
} from '../../../src/client/actions/SettingsActionCreators'

describe('SettingsReducer', () => {

  const reducer = combineReducers({
    [SETTINGS_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[SETTINGS_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should merge show tray name', () => {
      const existingState = state({showTrayName: false})
      const action = initalised({[SETTINGS_ROOT]: {showTrayName: true}})
      const newState = reducer(existingState, action)
      expect(getShowTrayName(newState)).toBeTruthy()
    })

    test('should merge build timers enabled', () => {
      const existingState = state({showBuildTime: false})
      const action = initalised({[SETTINGS_ROOT]: {showBuildTime: true}})
      const newState = reducer(existingState, action)
      expect(getShowBuildTime(newState)).toBeTruthy()
    })

    test('should merge broken build timers enabled', () => {
      const existingState = state({showBrokenBuildTime: false})
      const action = initalised({[SETTINGS_ROOT]: {showBrokenBuildTime: true}})
      const newState = reducer(existingState, action)
      expect(getShowBrokenBuildTime(newState)).toBeTruthy()
    })

    test('should merge broken build sounds enabled', () => {
      const existingState = state({playBrokenBuildSoundFx: false})
      const action = initalised({[SETTINGS_ROOT]: {playBrokenBuildSoundFx: true}})
      const newState = reducer(existingState, action)
      expect(getPlayBrokenBuildSoundFx(newState)).toBeTruthy()
    })

    test('should merge broken build sound fx', () => {
      const existingState = state({brokenBuildSoundFx: 'some-url'})
      const action = initalised({[SETTINGS_ROOT]: {brokenBuildSoundFx: 'another-url'}})
      const newState = reducer(existingState, action)
      expect(getBrokenBuildSoundFx(newState)).toEqual('another-url')
    })

    test('should merge refresh time', () => {
      const existingState = state({refreshTime: 5})
      const action = initalised({[SETTINGS_ROOT]: {refreshTime: 10}})
      const newState = reducer(existingState, action)
      expect(getRefreshTime(newState)).toEqual(10)
    })

    test('should merge show build label', () => {
      const existingState = state({showBuildLabel: false})
      const action = initalised({[SETTINGS_ROOT]: {showBuildLabel: true}})
      const newState = reducer(existingState, action)
      expect(getShowBuildLabel(newState)).toBeTruthy()
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should merge show tray name', () => {
      const existingState = state({showTrayName: false})
      const action = importSuccess({[SETTINGS_ROOT]: {showTrayName: true}})
      const newState = reducer(existingState, action)
      expect(getShowTrayName(newState)).toBeTruthy()
    })

    test('should merge build timers enabled', () => {
      const existingState = state({showBuildTime: false})
      const action = importSuccess({[SETTINGS_ROOT]: {showBuildTime: true}})
      const newState = reducer(existingState, action)
      expect(getShowBuildTime(newState)).toBeTruthy()
    })

    test('should merge broken build timers enabled', () => {
      const existingState = state({showBrokenBuildTime: false})
      const action = importSuccess({[SETTINGS_ROOT]: {showBrokenBuildTime: true}})
      const newState = reducer(existingState, action)
      expect(getShowBrokenBuildTime(newState)).toBeTruthy()
    })

    test('should merge broken build sounds enabled', () => {
      const existingState = state({playBrokenBuildSoundFx: false})
      const action = importSuccess({[SETTINGS_ROOT]: {playBrokenBuildSoundFx: true}})
      const newState = reducer(existingState, action)
      expect(getPlayBrokenBuildSoundFx(newState)).toBeTruthy()
    })

    test('should merge broken build sound fx', () => {
      const existingState = state({brokenBuildSoundFx: 'some-url'})
      const action = importSuccess({[SETTINGS_ROOT]: {brokenBuildSoundFx: 'another-url'}})
      const newState = reducer(existingState, action)
      expect(getBrokenBuildSoundFx(newState)).toEqual('another-url')
    })

    test('should merge show build label', () => {
      const existingState = state({showBuildLabel: false})
      const action = importSuccess({[SETTINGS_ROOT]: {showBuildLabel: true}})
      const newState = reducer(existingState, action)
      expect(getShowBuildLabel(newState)).toBeTruthy()
    })
  })

  describe(SHOW_BUILD_TIME, () => {

    test('should set the broken build timer enabled property', () => {
      const existingState = state({showBuildTime: false})
      const action = setShowBuildTime(true)
      const newState = reducer(existingState, action)
      expect(getShowBuildTime(newState)).toBeTruthy()
    })
  })

  describe(SHOW_BROKEN_BUILD_TIME, () => {

    test('should set the broken build timer enabled property', () => {
      const existingState = state({showBrokenBuildTime: false})
      const action = setShowBrokenBuildTime(true)
      const newState = reducer(existingState, action)
      expect(getShowBrokenBuildTime(newState)).toBeTruthy()
    })
  })

  describe(PLAY_BROKEN_BUILD_SOUND_FX, () => {

    test('should set the broken build sounds enabled property', () => {
      const existingState = state({playBrokenBuildSoundFx: false})
      const action = setPlayBrokenBuildSoundFx(true)
      const newState = reducer(existingState, action)
      expect(getPlayBrokenBuildSoundFx(newState)).toBeTruthy()
    })
  })

  describe(BROKEN_BUILD_SOUND_FX, () => {

    test('should set the broken build sound fx property', () => {
      const existingState = state({brokenBuildSoundFx: 'some-url'})
      const action = setBrokenBuildSoundFx('another-url')
      const newState = reducer(existingState, action)
      expect(getBrokenBuildSoundFx(newState)).toEqual('another-url')
    })
  })

  describe(SHOW_TRAY_NAME, () => {

    test('should set the tray name toggled property', () => {
      const existingState = state({showTrayName: false})
      const action = setShowTrayName(true)
      const newState = reducer(existingState, action)
      expect(getShowTrayName(newState)).toBeTruthy()
    })
  })

  describe(REFRESH_TIME, () => {

    test('should set the refresh time property', () => {
      const existingState = state({refreshTime: 5})
      const action = setRefreshTime(10)
      const newState = reducer(existingState, action)
      expect(getRefreshTime(newState)).toEqual(10)
    })
  })

  describe(REQUESTING_SYSTEM_NOTIFICATION_PERMISSION, () => {

    test('should set the system notification requesting permission property', () => {
      const existingState = state({systemNotificationRequestingPermission: false})
      const action = requestingSystemNotificationPermission()
      const newState = reducer(existingState, action)
      expect(getSystemNotificationRequestingPermission(newState)).toBeTruthy()
    })
  })

  describe(SHOW_SYSTEM_NOTIFICATIONS, () => {

    test('should set the show browser notifications property', () => {
      const existingState = state({showSystemNotifications: false})
      const action = setShowSystemNotifications(true)
      const newState = reducer(existingState, action)
      expect(getShowSystemNotifications(newState)).toBeTruthy()
    })

    test('should reset the system notification permission denied property', () => {
      const existingState = state({systemNotificationPermissionDenied: true})
      const action = setShowSystemNotifications(true)
      const newState = reducer(existingState, action)
      expect(getSystemNotificationPermissionDenied(newState)).toBeFalsy()
    })

    test('should reset the system notification requesting permission property', () => {
      const existingState = state({systemNotificationRequestingPermission: true})
      const action = setShowSystemNotifications(true)
      const newState = reducer(existingState, action)
      expect(getSystemNotificationRequestingPermission(newState)).toBeFalsy()
    })
  })

  describe(SYSTEM_NOTIFICATIONS_PERMISSION_DENIED, () => {

    test('should set the system notification permission denied property', () => {
      const existingState = state({systemNotificationPermissionDenied: false})
      const action = systemNotificationPermissionDenied()
      const newState = reducer(existingState, action)
      expect(getSystemNotificationPermissionDenied(newState)).toBeTruthy()
    })

    test('should reset the system notification requesting permission property', () => {
      const existingState = state({systemNotificationRequestingPermission: true})
      const action = systemNotificationPermissionDenied()
      const newState = reducer(existingState, action)
      expect(getSystemNotificationRequestingPermission(newState)).toBeFalsy()
    })
  })

  describe(SET_MAX_PROJECTS, () => {

    test('should set the max projects to show property', () => {
      const existingState = state({maxProjectsToShow: 9})
      const action = setMaxProjectsToShow(12)
      const newState = reducer(existingState, action)
      expect(getMaxProjectsToShow(newState)).toEqual(12)
    })
  })

  describe(CLICK_TO_SHOW_MENU, () => {

    test('should set the click to show menu property', () => {
      const existingState = state({clickToShowMenu: false})
      const action = setClickToShowMenu(true)
      const newState = reducer(existingState, action)
      expect(getClickToShowMenu(newState)).toBeTruthy()
    })
  })
})
