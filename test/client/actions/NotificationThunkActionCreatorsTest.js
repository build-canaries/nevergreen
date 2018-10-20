import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'
import {fromJS, List} from 'immutable'
import {SETTINGS_ROOT} from '../../../src/client/reducers/SettingsReducer'
import {INTERESTING_ROOT} from '../../../src/client/reducers/InterestingReducer'
import {PROGNOSIS_SICK, Project} from '../../../src/client/domain/Project'

describe('NotificationThunkActionCreators', function () {

  const send = mocks.stub()
  const get = mocks.stub()
  const gt = mocks.stub()
  const notify = mocks.spy()
  const sendSystemNotification = mocks.spy()

  const {checkForNewVersion, projectNotifications} = withMockedImports('client/actions/NotificationThunkActionCreators', {
    '../common/gateways/Gateway': {get},
    '../common/gateways/GitHubGateway': {send},
    'semver': {gt},
    './NotificationActionCreators': {notify},
    '../common/SystemNotifications': {sendSystemNotification}
  })

  describe('checkForNewVersion', function () {

    it('should call the github releases api', async function () {
      send.resolves(fromJS({}))
      gt.returns(true)
      await testThunk(checkForNewVersion())
      expect(get).to.have.been.calledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
    })

    it('should dispatch notification if a new version is available', async function () {
      send.resolves(fromJS({}))
      gt.returns(true)
      await testThunk(checkForNewVersion())
      expect(notify).to.have.been.called()
    })
  })

  describe('projectNotifications', function () {

    const requiredState = fromJS({
      [SETTINGS_ROOT]: {
        showSystemNotifications: true
      },
      [INTERESTING_ROOT]: {
        projects: []
      }
    })

    const sickProject = new Project({name: 'some-name', prognosis: PROGNOSIS_SICK})

    it('should not send updates if nothing has changed', async function () {
      const previousProjects = List()
      await testThunk(projectNotifications(previousProjects), requiredState)
      expect(sendSystemNotification).to.not.have.been.called()
    })

    it('should send sick notification when project becomes sick', async function () {
      const previousProjects = List()
      const state = requiredState.setIn([INTERESTING_ROOT, 'projects', 0], sickProject)
      await testThunk(projectNotifications(previousProjects), state)
      expect(sendSystemNotification).to.have.been.calledWith({title: 'project is sick!', body: 'some-name'})
    })

    it('should send not sick notification when project is no longer interesting', async function () {
      const previousProjects = List.of(sickProject)
      await testThunk(projectNotifications(previousProjects), requiredState)
      expect(sendSystemNotification).to.have.been.calledWith({title: 'project is no longer sick!', body: 'some-name'})
    })

    it('should not send sick notifications when project is still sick', async function () {
      const previousProjects = List.of(sickProject)
      const state = requiredState.setIn([INTERESTING_ROOT, 'projects', 0], sickProject)
      await testThunk(projectNotifications(previousProjects), state)
      expect(sendSystemNotification).to.not.have.been.called()
    })
  })
})
