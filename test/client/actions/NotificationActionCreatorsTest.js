import {proxyquire} from '../TestUtils'
import {before, beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import {NOTIFICATION, NOTIFICATION_DISMISS} from '../../../src/client/actions/Actions'

describe('NotificationActionCreators', function () {
  let NotificationActions, Gateway, semver

  before(function () {
    Gateway = {}
    semver = {}
    NotificationActions = proxyquire('../../src/client/actions/NotificationActionCreators', {
      '../common/gateways/Gateway': Gateway,
      semver
    })
  })

  describe('notification', function () {

    it('should return the correct type', function () {
      const actual = NotificationActions.notification()
      expect(actual).to.have.property('type', NOTIFICATION)
    })

    it('should return the message', function () {
      const actual = NotificationActions.notification('some-message')
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
    let dispatch

    beforeEach(function () {
      dispatch = sinon.spy()
    })

    it('should call the github releases api', function () {
      Gateway.get = sinon.stub().returns({})
      Gateway.send = sinon.stub().returns(Promise.resolve({}))
      semver.gt = sinon.stub().returns(true)
      NotificationActions.checkForNewVersion()(dispatch)
      expect(Gateway.get).to.have.been.calledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
    })

    it('should dispatch notification if a new version is available', function () {
      Gateway.get = sinon.stub().returns({})
      Gateway.send = sinon.stub().returns(Promise.resolve({}))
      semver.gt = sinon.stub().returns(true)
      return NotificationActions.checkForNewVersion()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: NOTIFICATION})
      })
    })
  })
})
