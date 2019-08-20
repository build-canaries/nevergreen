import {buildProject, buildState, testThunk} from '../testHelpers'
import {INTERESTING_ROOT} from '../../../src/client/monitor/InterestingReducer'
import {Prognosis} from '../../../src/client/domain/Project'
import {checkForNewVersion, projectNotifications} from '../../../src/client/notification/NotificationThunkActionCreators'
import * as gateway from '../../../src/client/gateways/Gateway'
import semver from 'semver'
import * as notificationActionCreators from '../../../src/client/notification/NotificationActionCreators'
import * as systemNotifications from '../../../src/client/common/SystemNotifications'
import {SETTINGS_ROOT} from '../../../src/client/settings/SettingsReducer'

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

  describe('projectNotifications', () => {

    const sickProject = buildProject({name: 'some-name', prognosis: Prognosis.sick})

    test('should not send updates if nothing has changed', async () => {
      jest.spyOn(systemNotifications, 'sendSystemNotification')
      await testThunk(projectNotifications([]), buildState({
        [SETTINGS_ROOT]: {
          showSystemNotifications: true
        }
      }))
      expect(systemNotifications.sendSystemNotification).not.toBeCalled()
    })

    test('should send sick notification when project becomes sick', async () => {
      jest.spyOn(systemNotifications, 'sendSystemNotification')
      const state = buildState({
        [SETTINGS_ROOT]: {
          showSystemNotifications: true
        },
        [INTERESTING_ROOT]: {
          projects: [sickProject]
        }
      })
      await testThunk(projectNotifications([]), state)
      expect(systemNotifications.sendSystemNotification).toBeCalledWith({title: 'project is sick!', body: 'some-name'})
    })

    test('should send not sick notification when project is no longer interesting', async () => {
      jest.spyOn(systemNotifications, 'sendSystemNotification')
      await testThunk(projectNotifications([sickProject]), buildState({
        [SETTINGS_ROOT]: {
          showSystemNotifications: true
        }
      }))
      expect(systemNotifications.sendSystemNotification).toBeCalledWith({
        title: 'project is no longer sick!',
        body: 'some-name'
      })
    })

    test('should not send sick notifications when project is still sick', async () => {
      jest.spyOn(systemNotifications, 'sendSystemNotification')
      const state = buildState({
        [SETTINGS_ROOT]: {
          showSystemNotifications: true
        },
        [INTERESTING_ROOT]: {
          projects: [sickProject]
        }
      })
      await testThunk(projectNotifications([sickProject]), state)
      expect(systemNotifications.sendSystemNotification).not.toBeCalled()
    })
  })
})
