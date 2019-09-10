import {Actions} from '../Actions'
import {ActionNotification} from './NotificationActionCreators'
import {createReducer} from 'redux-starter-kit'
import {State} from '../Reducer'

export type NotificationState = string

export const NOTIFICATION_ROOT = 'notification'

const DEFAULT_STATE: NotificationState = ''

export const reduce = createReducer<NotificationState>(DEFAULT_STATE, {
  [Actions.NOTIFICATION]: (draft, action: ActionNotification) => {
    return action.message
  },
  [Actions.NOTIFICATION_DISMISS]: () => {
    return ''
  }
})

export const getNotification = (state: State) => state[NOTIFICATION_ROOT]
