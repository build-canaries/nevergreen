import {
  MIN_REFRESH_TIME,
  requestingSystemNotificationPermission,
  setBrokenBuildSoundFx,
  setClickToShowMenu,
  setMaxProjectsToShow,
  setPlayBrokenBuildSoundFx,
  setRefreshTime,
  setShowBrokenBuildTime,
  setShowBuildLabel,
  setShowBuildTime,
  setShowSystemNotifications,
  setShowTrayName,
  systemNotificationPermissionDenied,
  VALID_PROJECTS_TO_SHOW
} from '../../../src/client/actions/SettingsActionCreators'
import {
  BROKEN_BUILD_SOUND_FX,
  CLICK_TO_SHOW_MENU,
  PLAY_BROKEN_BUILD_SOUND_FX,
  REFRESH_TIME,
  REQUESTING_SYSTEM_NOTIFICATION_PERMISSION,
  SET_MAX_PROJECTS,
  SHOW_BROKEN_BUILD_TIME,
  SHOW_BUILD_LABEL,
  SHOW_BUILD_TIME,
  SHOW_SYSTEM_NOTIFICATIONS,
  SHOW_TRAY_NAME,
  SYSTEM_NOTIFICATIONS_PERMISSION_DENIED
} from '../../../src/client/actions/Actions'

describe('SettingsActionCreators', () => {

  describe(SHOW_BROKEN_BUILD_TIME, () => {

    test('should return the correct type', () => {
      const actual = setShowBrokenBuildTime()
      expect(actual).toHaveProperty('type', SHOW_BROKEN_BUILD_TIME)
    })

    test('should return the given value', () => {
      const actual = setShowBrokenBuildTime(true)
      expect(actual).toHaveProperty('value', true)
    })
  })

  describe(SHOW_TRAY_NAME, () => {

    test('should return the correct type', () => {
      const actual = setShowTrayName()
      expect(actual).toHaveProperty('type', SHOW_TRAY_NAME)
    })

    test('should return the given value', () => {
      const actual = setShowTrayName(true)
      expect(actual).toHaveProperty('value', true)
    })
  })

  describe(PLAY_BROKEN_BUILD_SOUND_FX, () => {

    test('should return the correct type', () => {
      const actual = setPlayBrokenBuildSoundFx()
      expect(actual).toHaveProperty('type', PLAY_BROKEN_BUILD_SOUND_FX)
    })

    test('should return the given value', () => {
      const actual = setPlayBrokenBuildSoundFx(true)
      expect(actual).toHaveProperty('value', true)
    })
  })

  describe(BROKEN_BUILD_SOUND_FX, () => {

    test('should return the correct type', () => {
      const actual = setBrokenBuildSoundFx()
      expect(actual).toHaveProperty('type', BROKEN_BUILD_SOUND_FX)
    })

    test('should return the given value', () => {
      const actual = setBrokenBuildSoundFx('some-url')
      expect(actual).toHaveProperty('value', 'some-url')
    })
  })

  describe(REFRESH_TIME, () => {

    test('should return the correct type', () => {
      const actual = setRefreshTime()
      expect(actual).toHaveProperty('type', REFRESH_TIME)
    })

    test('should return the nearest valid value for an exact match', () => {
      const actual = setRefreshTime(3600)
      expect(actual).toHaveProperty('value', 3600)
    })

    test('should return the nearest valid value', () => {
      const actual = setRefreshTime(15)
      expect(actual).toHaveProperty('value', 10)
    })

    const invalidValues = [-1, 4, 'some-string']

    invalidValues.forEach(function (value) {
      test(`should return 5 second if the value is invalid (${value})`, () => {
        const actual = setRefreshTime(value)
        expect(actual).toHaveProperty('value', MIN_REFRESH_TIME)
      })
    })
  })

  describe(SHOW_BUILD_LABEL, () => {

    test('should return the correct type', () => {
      const actual = setShowBuildLabel()
      expect(actual).toHaveProperty('type', SHOW_BUILD_LABEL)
    })

    test('should return the given value', () => {
      const actual = setShowTrayName(true)
      expect(actual).toHaveProperty('value', true)
    })
  })

  describe(REQUESTING_SYSTEM_NOTIFICATION_PERMISSION, () => {

    test('should return the correct type', () => {
      const actual = requestingSystemNotificationPermission()
      expect(actual).toHaveProperty('type', REQUESTING_SYSTEM_NOTIFICATION_PERMISSION)
    })
  })

  describe(SHOW_SYSTEM_NOTIFICATIONS, () => {

    test('should return the correct type', () => {
      const actual = setShowSystemNotifications()
      expect(actual).toHaveProperty('type', SHOW_SYSTEM_NOTIFICATIONS)
    })

    test('should return the given value', () => {
      const actual = setShowSystemNotifications(true)
      expect(actual).toHaveProperty('value', true)
    })
  })

  describe(SYSTEM_NOTIFICATIONS_PERMISSION_DENIED, () => {

    test('should return the correct type', () => {
      const actual = systemNotificationPermissionDenied()
      expect(actual).toHaveProperty('type', SYSTEM_NOTIFICATIONS_PERMISSION_DENIED)
    })
  })

  describe(SHOW_BUILD_TIME, () => {

    test('should return the correct type', () => {
      const actual = setShowBuildTime()
      expect(actual).toHaveProperty('type', SHOW_BUILD_TIME)
    })

    test('should return the given value', () => {
      const actual = setShowBuildTime(true)
      expect(actual).toHaveProperty('value', true)
    })
  })

  describe(SET_MAX_PROJECTS, () => {

    test('should return the correct type', () => {
      const actual = setMaxProjectsToShow()
      expect(actual).toHaveProperty('type', SET_MAX_PROJECTS)
    })


    test('should return the nearest valid value for an exact match', () => {
      const actual = setMaxProjectsToShow(12)
      expect(actual).toHaveProperty('value', 12)
    })

    test('should return the nearest valid value', () => {
      const actual = setMaxProjectsToShow(13)
      expect(actual).toHaveProperty('value', 12)
    })

    const invalidValues = [-1, 4, 'some-string']

    invalidValues.forEach(function (value) {
      test(`should return min if the value is invalid (${value})`, () => {
        const actual = setMaxProjectsToShow(value)
        expect(actual).toHaveProperty('value', VALID_PROJECTS_TO_SHOW[0])
      })
    })
  })

  describe(CLICK_TO_SHOW_MENU, () => {

    test('should return the correct type', () => {
      const actual = setClickToShowMenu()
      expect(actual).toHaveProperty('type', CLICK_TO_SHOW_MENU)
    })

    test('should return the given value', () => {
      const actual = setClickToShowMenu(true)
      expect(actual).toHaveProperty('value', true)
    })
  })
})
