import {testThunk} from '../testHelpers'
import {enableSystemNotifications} from '../../../src/client/actions/SettingsThunkActionCreators'
import * as settingsActionCreators from '../../../src/client/actions/SettingsActionCreators'
import * as systemNotifications from '../../../src/client/common/SystemNotifications'

describe('SettingsThunkActionCreators', () => {

  settingsActionCreators.requestingSystemNotificationPermission = jest.fn()
  settingsActionCreators.setShowSystemNotifications = jest.fn()
  settingsActionCreators.systemNotificationPermissionDenied = jest.fn()
  systemNotifications.requestPermission = jest.fn()
  systemNotifications.permissionGranted = jest.fn()
  systemNotifications.sendSystemNotification = jest.fn()

  describe('enableSystemNotifications', () => {

    test('should just set show browser notifications to false when given false', async () => {
      await testThunk(enableSystemNotifications(false))
      expect(settingsActionCreators.setShowSystemNotifications).toBeCalledWith(false)
    })

    test('should dispatch system notification permission denied when permission is denied', async () => {
      systemNotifications.requestPermission.mockResolvedValue('irrelevant')
      systemNotifications.permissionGranted.mockReturnValue(false)
      await testThunk(enableSystemNotifications(true))
      expect(settingsActionCreators.systemNotificationPermissionDenied).toBeCalled()
    })

    test('should dispatching requesting permission', async () => {
      systemNotifications.requestPermission.mockResolvedValue('irrelevant')
      await testThunk(enableSystemNotifications(true))
      expect(settingsActionCreators.requestingSystemNotificationPermission).toBeCalled()
    })

    test('should set show browser notifications if permission is given', async () => {
      systemNotifications.requestPermission.mockResolvedValue('irrelevant')
      systemNotifications.permissionGranted.mockReturnValue(true)
      await testThunk(enableSystemNotifications(true))
      expect(settingsActionCreators.setShowSystemNotifications).toBeCalledWith(true)
    })

    test('should show a browser notification when they are enabled', async () => {
      systemNotifications.requestPermission.mockResolvedValue('irrelevant')
      systemNotifications.permissionGranted.mockReturnValue(true)
      await testThunk(enableSystemNotifications(true))
      expect(systemNotifications.sendSystemNotification).toBeCalled()
    })
  })
})
