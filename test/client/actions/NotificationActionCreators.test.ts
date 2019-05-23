import {Actions} from '../../../src/client/actions/Actions'
import {dismiss, notify} from '../../../src/client/actions/NotificationActionCreators'

describe('NotificationActionCreators', () => {

  describe(Actions.NOTIFICATION, () => {

    test('should return the correct type', () => {
      const actual = notify('')
      expect(actual).toHaveProperty('type', Actions.NOTIFICATION)
    })

    test('should return the message', () => {
      const actual = notify('some-message')
      expect(actual).toHaveProperty('message', 'some-message')
    })
  })

  describe(Actions.NOTIFICATION_DISMISS, () => {

    test('should return the correct type', () => {
      const actual = dismiss()
      expect(actual).toHaveProperty('type', Actions.NOTIFICATION_DISMISS)
    })
  })
})
