const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()
const Constants = require('../constants/NevergreenConstants')
const _ = require('lodash')

const CHANGE_EVENT = 'pushed-messages-change'

let _eventSource = null
let _storeState = null

const dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case Constants.AppInit:
    {
      _storeState = []
      _eventSource = new EventSource('/api/register')
      _eventSource.onmessage = evt => {
        _storeState.push(evt.data)
        eventEmitter.emit(CHANGE_EVENT)
      }
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
  dispatchToken: dispatchToken,

  getLastMessage() {
    return _.last(_storeState) || ''
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
