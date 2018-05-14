import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'

describe('NotificationThunkActionCreators', function () {

  const send = mocks.stub()
  const get = mocks.stub()
  const gt = mocks.stub()
  const notify = mocks.spy()

  const {checkForNewVersion} = withMockedImports('client/actions/NotificationThunkActionCreators', {
    '../common/gateways/Gateway': {send, get},
    'semver': {gt},
    './NotificationActionCreators': {notify}
  })

  describe('check for new version', function () {

    it('should call the github releases api', function () {
      send.resolves({})
      gt.returns(true)
      return testThunk(checkForNewVersion()).then(() => {
        expect(get).to.have.been.calledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
      })
    })

    it('should dispatch notification if a new version is available', function () {
      send.resolves({})
      gt.returns(true)
      return testThunk(checkForNewVersion()).then(() => {
        expect(notify).to.have.been.called()
      })
    })
  })
})
