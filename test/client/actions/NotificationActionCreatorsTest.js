import {withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {sandbox} from '../Sandbox'
import {NOTIFICATION, NOTIFICATION_DISMISS} from '../../../src/client/actions/Actions'

describe('NotificationActionCreators', function () {

  const Gateway = {}
  const semver = {}
  const NotificationActions = withMockedImports('client/actions/NotificationActionCreators', {
    '../common/gateways/Gateway': Gateway,
    semver
  })

  describe('notification', function () {

    it('should return the correct type', function () {
      const actual = NotificationActions.notify()
      expect(actual).to.have.property('type', NOTIFICATION)
    })

    it('should return the message', function () {
      const actual = NotificationActions.notify('some-message')
      expect(actual).to.have.property('message', 'some-message')
    })
  })

  describe('notification dismiss', function () {

    it('should return the correct type', function () {
      const actual = NotificationActions.dismiss()
      expect(actual).to.have.property('type', NOTIFICATION_DISMISS)
    })
  })

  describe('check for new version', function () {

    const dispatch = sandbox.spy()

    it('should call the github releases api', function () {
      Gateway.get = sandbox.stub().returns({})
      Gateway.send = sandbox.stub().returns(Promise.resolve({}))
      semver.gt = sandbox.stub().returns(true)
      NotificationActions.checkForNewVersion()(dispatch)
      expect(Gateway.get).to.have.been.calledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
    })

    it('should dispatch notification if a new version is available', function () {
      Gateway.get = sandbox.stub().returns({})
      Gateway.send = sandbox.stub().returns(Promise.resolve({}))
      semver.gt = sandbox.stub().returns(true)
      return NotificationActions.checkForNewVersion()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: NOTIFICATION})
      })
    })
  })
})
