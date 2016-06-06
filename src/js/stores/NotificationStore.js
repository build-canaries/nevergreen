import AppDispatcher from '../dispatcher/AppDispatcher'
import {EventEmitter} from 'events'
import {NotificationDismiss, Notification} from '../constants/NevergreenConstants'
import {AppInit} from '../NevergreenActions'

const eventEmitter = new EventEmitter()
const CHANGE_EVENT = 'notification-change'

let _storeState = null

const dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case AppInit:
    case NotificationDismiss:
    {
      _storeState = ''
      break
    }
    case Notification:
    {
      _storeState = action.message
      break
    }
    default :
    {
      return true
    }
  }

  eventEmitter.emit(CHANGE_EVENT)
  return true
})

module.exports = {
  dispatchToken,

  getNotification() {
    return _storeState
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
