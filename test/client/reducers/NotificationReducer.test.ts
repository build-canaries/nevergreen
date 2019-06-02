import {
  getNotification,
  NOTIFICATION_ROOT,
  NotificationState,
  reduce
} from '../../../src/client/reducers/NotificationReducer'
import {Actions} from '../../../src/client/actions/Actions'
import {dismiss, notify} from '../../../src/client/actions/NotificationActionCreators'
import {RecursivePartial} from '../../../src/client/common/Types'
import {buildState, testReducer} from '../testHelpers'

describe('NotificationReducer', () => {

  const reducer = testReducer({
    [NOTIFICATION_ROOT]: reduce
  })

  function state(existing?: RecursivePartial<NotificationState>) {
    return buildState({[NOTIFICATION_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state()
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(Actions.NOTIFICATION, () => {

    test('should set the state', () => {
      const existingState = state()
      const action = notify('some-message')
      const newState = reducer(existingState, action)
      expect(getNotification(newState)).toEqual('some-message')
    })
  })

  describe(Actions.NOTIFICATION_DISMISS, () => {

    test('should remove the state', () => {
      const existingState = state('some-message')
      const action = dismiss()
      const newState = reducer(existingState, action)
      expect(getNotification(newState)).toEqual('')
    })
  })
})
