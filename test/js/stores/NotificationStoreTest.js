import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import {AppInit, Notification, NotificationDismiss} from '../../../src/js/NevergreenActions'

describe('notification store', () => {

  let AppDispatcher, subject, callback

  before(() => {
    AppDispatcher = {
      register: sinon.spy()
    }
    subject = proxyquire('../../../src/js/stores/NotificationStore', {'../common/AppDispatcher': AppDispatcher})

    callback = AppDispatcher.register.getCall(0).args[0]
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()

    callback({
      type: AppInit
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register).to.have.been.called
  })

  it('returns an empty string by default', () => {
    expect(subject.getNotification()).to.equal('')
  })

  describe('notification event', () => {
    beforeEach(() => {
      callback({
        type: Notification,
        message: 'some-message'
      })
    })

    it('sets the notification to the message', () => {
      expect(subject.getNotification()).to.equal('some-message')
    })
  })

  describe('dismissing the notification', () => {
    beforeEach(() => {
      callback({
        type: Notification,
        message: 'some-message'
      })
      callback({
        type: NotificationDismiss
      })
    })

    it('sets the notification back to an empty string', () => {
      expect(subject.getNotification()).to.equal('')
    })
  })

})
