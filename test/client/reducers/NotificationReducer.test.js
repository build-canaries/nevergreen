import {reduce} from '../../../src/client/reducers/NotificationReducer'
import {NOTIFICATION, NOTIFICATION_DISMISS} from '../../../src/client/actions/Actions'

describe('NotificationReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(NOTIFICATION, () => {

    test('should set the state', () => {
      const existingState = null
      const action = {type: NOTIFICATION, message: 'some-message'}
      const newState = reduce(existingState, action)
      expect(newState).toBe('some-message')
    })
  })

  describe(NOTIFICATION_DISMISS, () => {

    test('should remove the state', () => {
      const existingState = 'some-message'
      const action = {type: NOTIFICATION_DISMISS}
      const newState = reduce(existingState, action)
      expect(newState).toBeNull()
    })
  })
})
