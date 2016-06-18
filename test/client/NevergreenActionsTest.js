import './UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('nevergreen actions', () => {
  let subject, AppDispatcher, LocalRepository, Gateway

  before(() => {
    AppDispatcher = {}
    LocalRepository = {}
    Gateway = {}
    subject = proxyquire('../../src/client/NevergreenActions', {
      './common/AppDispatcher': AppDispatcher,
      './common/LocalRepository': LocalRepository,
      './common/gateways/Gateway': Gateway
    })
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()
    LocalRepository.getConfiguration = sinon.stub().returnsPromise()
    Gateway.get = sinon.stub().returnsPromise()
  })

  describe('a new version is available', () => {
    it('dispatches an action with the correct type', () => {
      Gateway.get.resolves({tag_name: '0.2.0'})

      subject.checkForNewVersion('0.1.0', 'nevergreen.io')

      expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
        type: subject.Notification
      })
    })

    it('dispatches an action mentioning refreshing if on nevergreen.io', () => {
      Gateway.get.resolves({tag_name: '0.2.0'})

      subject.checkForNewVersion('0.1.0', 'nevergreen.io')

      expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
        message: 'A new version 0.2.0 is available, refresh to update!'
      })
    })

    it('dispatches an action mentioning GitHub if self hosting', () => {
      Gateway.get.resolves({tag_name: '0.2.0'})

      subject.checkForNewVersion('0.1.0', 'my-internal-server-name')

      expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
        message: 'A new version 0.2.0 is available to download from GitHub now!'
      })
    })
  })

  it('does not dispatches an action if you are on the latest version', () => {
    Gateway.get.resolves({tag_name: '0.1.0'})

    subject.checkForNewVersion('0.1.0')

    expect(AppDispatcher.dispatch).to.not.have.been.called
  })

  it('dispatches a dismiss notification action', () => {
    subject.dismiss()

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.NotificationDismiss
    })
  })
})
