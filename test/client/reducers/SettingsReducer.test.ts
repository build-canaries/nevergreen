import {
  getBrokenBuildSoundFx,
  getClickToShowMenu,
  getMaxProjectsToShow,
  getPlayBrokenBuildSoundFx,
  getRefreshTime,
  getShowBrokenBuildTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowPrognosis,
  getShowSystemNotifications,
  getShowTrayName,
  getSystemNotificationPermissionDenied,
  getSystemNotificationRequestingPermission,
  reduce,
  SETTINGS_ROOT,
  SettingsState
} from '../../../src/client/reducers/SettingsReducer'
import {Actions} from '../../../src/client/actions/Actions'
import {setConfiguration} from '../../../src/client/actions/NevergreenActionCreators'
import {
  requestingSystemNotificationPermission,
  setBrokenBuildSoundFx,
  setClickToShowMenu,
  setMaxProjectsToShow,
  setPlayBrokenBuildSoundFx,
  setRefreshTime,
  setShowBrokenBuildTime,
  setShowBuildTime,
  setShowPrognosis,
  setShowSystemNotifications,
  setShowTrayName,
  systemNotificationPermissionDenied
} from '../../../src/client/actions/SettingsActionCreators'
import {buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'
import {Prognosis} from '../../../src/client/domain/Project'

describe('SettingsReducer', () => {

  const reducer = testReducer({
    [SETTINGS_ROOT]: reduce
  })

  function state(existing?: RecursivePartial<SettingsState>) {
    return buildState({[SETTINGS_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state()
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(Actions.SET_CONFIGURATION, () => {

    test('should merge show tray name', () => {
      const existingState = state({showTrayName: false})
      const action = setConfiguration({[SETTINGS_ROOT]: {showTrayName: true}})
      const newState = reducer(existingState, action)
      expect(getShowTrayName(newState)).toBeTruthy()
    })

    test('should merge build timers enabled', () => {
      const existingState = state({showBuildTime: false})
      const action = setConfiguration({[SETTINGS_ROOT]: {showBuildTime: true}})
      const newState = reducer(existingState, action)
      expect(getShowBuildTime(newState)).toBeTruthy()
    })

    test('should merge broken build timers enabled', () => {
      const existingState = state({showBrokenBuildTime: false})
      const action = setConfiguration({[SETTINGS_ROOT]: {showBrokenBuildTime: true}})
      const newState = reducer(existingState, action)
      expect(getShowBrokenBuildTime(newState)).toBeTruthy()
    })

    test('should merge broken build sounds enabled', () => {
      const existingState = state({playBrokenBuildSoundFx: false})
      const action = setConfiguration({[SETTINGS_ROOT]: {playBrokenBuildSoundFx: true}})
      const newState = reducer(existingState, action)
      expect(getPlayBrokenBuildSoundFx(newState)).toBeTruthy()
    })

    test('should merge broken build sound fx', () => {
      const existingState = state({brokenBuildSoundFx: 'some-url'})
      const action = setConfiguration({[SETTINGS_ROOT]: {brokenBuildSoundFx: 'another-url'}})
      const newState = reducer(existingState, action)
      expect(getBrokenBuildSoundFx(newState)).toEqual('another-url')
    })

    test('should merge show build label', () => {
      const existingState = state({showBuildLabel: false})
      const action = setConfiguration({[SETTINGS_ROOT]: {showBuildLabel: true}})
      const newState = reducer(existingState, action)
      expect(getShowBuildLabel(newState)).toBeTruthy()
    })
  })

  describe(Actions.SHOW_BUILD_TIME, () => {

    test('should set the broken build timer enabled property', () => {
      const existingState = state({showBuildTime: false})
      const action = setShowBuildTime(true)
      const newState = reducer(existingState, action)
      expect(getShowBuildTime(newState)).toBeTruthy()
    })
  })

  describe(Actions.SHOW_BROKEN_BUILD_TIME, () => {

    test('should set the broken build timer enabled property', () => {
      const existingState = state({showBrokenBuildTime: false})
      const action = setShowBrokenBuildTime(true)
      const newState = reducer(existingState, action)
      expect(getShowBrokenBuildTime(newState)).toBeTruthy()
    })
  })

  describe(Actions.PLAY_BROKEN_BUILD_SOUND_FX, () => {

    test('should set the broken build sounds enabled property', () => {
      const existingState = state({playBrokenBuildSoundFx: false})
      const action = setPlayBrokenBuildSoundFx(true)
      const newState = reducer(existingState, action)
      expect(getPlayBrokenBuildSoundFx(newState)).toBeTruthy()
    })
  })

  describe(Actions.BROKEN_BUILD_SOUND_FX, () => {

    test('should set the broken build sound fx property', () => {
      const existingState = state({brokenBuildSoundFx: 'some-url'})
      const action = setBrokenBuildSoundFx('another-url')
      const newState = reducer(existingState, action)
      expect(getBrokenBuildSoundFx(newState)).toEqual('another-url')
    })
  })

  describe(Actions.SHOW_TRAY_NAME, () => {

    test('should set the tray name toggled property', () => {
      const existingState = state({showTrayName: false})
      const action = setShowTrayName(true)
      const newState = reducer(existingState, action)
      expect(getShowTrayName(newState)).toBeTruthy()
    })
  })

  describe(Actions.REFRESH_TIME, () => {

    test('should set the refresh time property', () => {
      const existingState = state({refreshTime: 5})
      const action = setRefreshTime('10')
      const newState = reducer(existingState, action)
      expect(getRefreshTime(newState)).toEqual(10)
    })
  })

  describe(Actions.REQUESTING_SYSTEM_NOTIFICATION_PERMISSION, () => {

    test('should set the system notification requesting permission property', () => {
      const existingState = state({systemNotificationRequestingPermission: false})
      const action = requestingSystemNotificationPermission()
      const newState = reducer(existingState, action)
      expect(getSystemNotificationRequestingPermission(newState)).toBeTruthy()
    })
  })

  describe(Actions.SHOW_SYSTEM_NOTIFICATIONS, () => {

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

  describe(Actions.SYSTEM_NOTIFICATIONS_PERMISSION_DENIED, () => {

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

  describe(Actions.SET_MAX_PROJECTS, () => {

    test('should set the max projects to show property', () => {
      const existingState = state({maxProjectsToShow: 9})
      const action = setMaxProjectsToShow('12')
      const newState = reducer(existingState, action)
      expect(getMaxProjectsToShow(newState)).toEqual(12)
    })
  })

  describe(Actions.CLICK_TO_SHOW_MENU, () => {

    test('should set the click to show menu property', () => {
      const existingState = state({clickToShowMenu: false})
      const action = setClickToShowMenu(true)
      const newState = reducer(existingState, action)
      expect(getClickToShowMenu(newState)).toBeTruthy()
    })
  })

  describe(Actions.SHOW_PROGNOSIS, () => {

    test('should add the prognosis to show', () => {
      const existingState = state({showPrognosis: []})
      const action = setShowPrognosis(Prognosis.sick, true)
      const newState = reducer(existingState, action)
      expect(getShowPrognosis(newState)).toEqual([Prognosis.sick])
    })

    test('should remove the prognosis to hide', () => {
      const existingState = state({showPrognosis: [Prognosis.sick, Prognosis.sickBuilding]})
      const action = setShowPrognosis(Prognosis.sick, false)
      const newState = reducer(existingState, action)
      expect(getShowPrognosis(newState)).toEqual([Prognosis.sickBuilding])
    })
  })
})
