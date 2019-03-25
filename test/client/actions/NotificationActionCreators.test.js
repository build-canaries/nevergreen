import {NOTIFICATION, NOTIFICATION_DISMISS} from '../../../src/client/actions/Actions'
import {dismiss, notify} from '../../../src/client/actions/NotificationActionCreators'

describe('NotificationActionCreators', () => {

  describe(NOTIFICATION, () => {

    test('should return the correct type', () => {
      const actual = notify()
      expect(actual).toHaveProperty('type', NOTIFICATION)
    })

    test('should return the message', () => {
      const actual = notify('some-message')
      expect(actual).toHaveProperty('message', 'some-message')
    })
  })

  describe(NOTIFICATION_DISMISS, () => {

    test('should return the correct type', () => {
      const actual = dismiss()
      expect(actual).toHaveProperty('type', NOTIFICATION_DISMISS)
    })
  })
})
