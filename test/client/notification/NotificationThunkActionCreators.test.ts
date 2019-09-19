import {testThunk} from '../testHelpers'
import {checkForNewVersion} from '../../../src/client/notification/NotificationThunkActionCreators'
import * as gateway from '../../../src/client/gateways/Gateway'
import semver from 'semver'
import * as notificationActionCreators from '../../../src/client/notification/NotificationActionCreators'

describe('NotificationThunkActionCreators', () => {

  describe('checkForNewVersion', () => {

    test('should call the github releases api', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue({})
      jest.spyOn(semver, 'gt').mockReturnValue(true)
      jest.spyOn(gateway, 'get')
      await testThunk(checkForNewVersion('irrelevant', 'irrelevant'))
      expect(gateway.get).toBeCalledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
    })

    test('should dispatch notification if a new version is available', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue({})
      jest.spyOn(semver, 'gt').mockReturnValue(true)
      jest.spyOn(notificationActionCreators, 'notify')
      await testThunk(checkForNewVersion('irrelevant', 'irrelevant'))
      expect(notificationActionCreators.notify).toBeCalled()
    })
  })
})
