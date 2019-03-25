import {testThunk} from '../testHelpers'
import {fromJS, List} from 'immutable'
import {SETTINGS_ROOT} from '../../../src/client/reducers/SettingsReducer'
import {INTERESTING_ROOT} from '../../../src/client/reducers/InterestingReducer'
import {PROGNOSIS_SICK, Project} from '../../../src/client/domain/Project'
import {checkForNewVersion, projectNotifications} from '../../../src/client/actions/NotificationThunkActionCreators'
import * as gateway from '../../../src/client/gateways/Gateway'
import * as  gitHubGateway from '../../../src/client/gateways/GitHubGateway'
import semver from 'semver'
import * as notificationActionCreators from '../../../src/client/actions/NotificationActionCreators'
import * as systemNotifications from '../../../src/client/common/SystemNotifications'

describe('NotificationThunkActionCreators', () => {

  gitHubGateway.send = jest.fn()
  gateway.get = jest.fn()
  semver.gt = jest.fn()
  notificationActionCreators.notify = jest.fn()
  systemNotifications.sendSystemNotification = jest.fn()

  describe('checkForNewVersion', () => {

    test('should call the github releases api', async () => {
      gitHubGateway.send.mockResolvedValue(fromJS({}))
      semver.gt.mockReturnValue(true)
      await testThunk(checkForNewVersion())
      expect(gateway.get).toBeCalledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
    })

    test('should dispatch notification if a new version is available', async () => {
      gitHubGateway.send.mockResolvedValue(fromJS({}))
      semver.gt.mockReturnValue(true)
      await testThunk(checkForNewVersion())
      expect(notificationActionCreators.notify).toBeCalled()
    })
  })

  describe('projectNotifications', () => {

    const requiredState = fromJS({
      [SETTINGS_ROOT]: {
        showSystemNotifications: true
      },
      [INTERESTING_ROOT]: {
        projects: []
      }
    })

    const sickProject = new Project({name: 'some-name', prognosis: PROGNOSIS_SICK})

    test('should not send updates if nothing has changed', async () => {
      const previousProjects = List()
      await testThunk(projectNotifications(previousProjects), requiredState)
      expect(systemNotifications.sendSystemNotification).not.toBeCalled()
    })

    test('should send sick notification when project becomes sick', async () => {
      const previousProjects = List()
      const state = requiredState.setIn([INTERESTING_ROOT, 'projects', 0], sickProject)
      await testThunk(projectNotifications(previousProjects), state)
      expect(systemNotifications.sendSystemNotification).toBeCalledWith({title: 'project is sick!', body: 'some-name'})
    })

    test('should send not sick notification when project is no longer interesting', async () => {
      const previousProjects = List.of(sickProject)
      await testThunk(projectNotifications(previousProjects), requiredState)
      expect(systemNotifications.sendSystemNotification).toBeCalledWith({
        title: 'project is no longer sick!',
        body: 'some-name'
      })
    })

    test('should not send sick notifications when project is still sick', async () => {
      const previousProjects = List.of(sickProject)
      const state = requiredState.setIn([INTERESTING_ROOT, 'projects', 0], sickProject)
      await testThunk(projectNotifications(previousProjects), state)
      expect(systemNotifications.sendSystemNotification).not.toBeCalled()
    })
  })
})
