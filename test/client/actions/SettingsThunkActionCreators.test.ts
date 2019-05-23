import {testThunk} from '../testHelpers'
import {enableSystemNotifications} from '../../../src/client/actions/SettingsThunkActionCreators'
import * as settingsActionCreators from '../../../src/client/actions/SettingsActionCreators'
import * as systemNotifications from '../../../src/client/common/SystemNotifications'

describe('SettingsThunkActionCreators', () => {

  describe('enableSystemNotifications', () => {

    test('should just set show browser notifications to false when given false', async () => {
      jest.spyOn(settingsActionCreators, 'setShowSystemNotifications')
      await testThunk(enableSystemNotifications(false))
      expect(settingsActionCreators.setShowSystemNotifications).toBeCalledWith(false)
    })

    test('should dispatch system notification permission denied when permission is denied', async () => {
      jest.spyOn(systemNotifications, 'requestPermission').mockResolvedValue('irrelevant')
      jest.spyOn(systemNotifications, 'permissionGranted').mockReturnValue(false)
      jest.spyOn(settingsActionCreators, 'systemNotificationPermissionDenied')
      await testThunk(enableSystemNotifications(true))
      expect(settingsActionCreators.systemNotificationPermissionDenied).toBeCalled()
    })

    test('should dispatching requesting permission', async () => {
      jest.spyOn(systemNotifications, 'requestPermission').mockResolvedValue('irrelevant')
      jest.spyOn(settingsActionCreators, 'requestingSystemNotificationPermission')
      await testThunk(enableSystemNotifications(true))
      expect(settingsActionCreators.requestingSystemNotificationPermission).toBeCalled()
    })

    test('should set show browser notifications if permission is given', async () => {
      jest.spyOn(systemNotifications, 'requestPermission').mockResolvedValue('irrelevant')
      jest.spyOn(systemNotifications, 'permissionGranted').mockReturnValue(true)
      jest.spyOn(settingsActionCreators, 'setShowSystemNotifications')
      await testThunk(enableSystemNotifications(true))
      expect(settingsActionCreators.setShowSystemNotifications).toBeCalledWith(true)
    })

    test('should show a browser notification when they are enabled', async () => {
      jest.spyOn(systemNotifications, 'requestPermission').mockResolvedValue('irrelevant')
      jest.spyOn(systemNotifications, 'permissionGranted').mockReturnValue(true)
      jest.spyOn(systemNotifications, 'sendSystemNotification')
      await testThunk(enableSystemNotifications(true))
      expect(systemNotifications.sendSystemNotification).toBeCalled()
    })
  })
})
