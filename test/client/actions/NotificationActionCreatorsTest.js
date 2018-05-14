import {describe, it} from 'mocha'
import {expect} from 'chai'
import {NOTIFICATION, NOTIFICATION_DISMISS} from '../../../src/client/actions/Actions'
import {dismiss, notify} from '../../../src/client/actions/NotificationActionCreators'

describe('NotificationActionCreators', function () {

  describe('notification', function () {

    it('should return the correct type', function () {
      const actual = notify()
      expect(actual).to.have.property('type', NOTIFICATION)
    })

    it('should return the message', function () {
      const actual = notify('some-message')
      expect(actual).to.have.property('message', 'some-message')
    })
  })

  describe('notification dismiss', function () {

    it('should return the correct type', function () {
      const actual = dismiss()
      expect(actual).to.have.property('type', NOTIFICATION_DISMISS)
    })
  })
})
