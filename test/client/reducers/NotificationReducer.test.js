import {NOTIFICATION_ROOT, reduce} from '../../../src/client/reducers/NotificationReducer'
import {NOTIFICATION, NOTIFICATION_DISMISS} from '../../../src/client/actions/Actions'
import {combineReducers} from 'redux-immutable'
import {fromJS} from 'immutable'
import {dismiss, notify} from '../../../src/client/actions/NotificationActionCreators'
import {getNotification} from '../../../src/client/reducers/Selectors'

describe('NotificationReducer', () => {

  const reducer = combineReducers({
    [NOTIFICATION_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[NOTIFICATION_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(NOTIFICATION, () => {

    test('should set the state', () => {
      const existingState = state(null)
      const action = notify('some-message')
      const newState = reducer(existingState, action)
      expect(getNotification(newState)).toBe('some-message')
    })
  })

  describe(NOTIFICATION_DISMISS, () => {

    test('should remove the state', () => {
      const existingState = state('some-message')
      const action = dismiss()
      const newState = reducer(existingState, action)
      expect(getNotification(newState)).toBeNull()
    })
  })
})
