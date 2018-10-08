import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'
import {fromJS} from 'immutable'

describe('NotificationThunkActionCreators', function () {

  const send = mocks.stub()
  const get = mocks.stub()
  const gt = mocks.stub()
  const notify = mocks.spy()

  const {checkForNewVersion} = withMockedImports('client/actions/NotificationThunkActionCreators', {
    '../common/gateways/Gateway': {get},
    '../common/gateways/GitHubGateway': {send},
    'semver': {gt},
    './NotificationActionCreators': {notify}
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
})
