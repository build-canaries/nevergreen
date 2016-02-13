const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()
const Constants = require('../constants/NevergreenConstants')

const CHANGE_EVENT = 'message-change'

let _storeState = null

const dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case Constants.AppInit:
    case Constants.RestoreConfiguration:
    {
      _storeState = {
        success: {
          errors: []
        },
        importing: {
          errors: [],
          infos: action.messages || []
        }
      }
      break
    }
    case Constants.MessageInvalidInput:
    {
      _storeState.success.errors = action.errors
      break
    }
    case Constants.MessageAdd:
    case Constants.MessageRemove:
    {
      _storeState.success.errors = []
      break
    }
    case Constants.ImportingData:
    {
      _storeState.importing.errors = []
      _storeState.importing.infos = []
      break
    }
    case Constants.ImportError:
    {
      _storeState.importing.errors = action.errors
      _storeState.importing.infos = []
      break
    }
    default:
    {
      return true
    }
  }

  eventEmitter.emit(CHANGE_EVENT)
  return true
})

module.exports = {
  dispatchToken: dispatchToken,

  getSuccessErrors() {
    return _storeState.success.errors
  },

  getImportErrors() {
    return _storeState.importing.errors
  },

  getImportInfos() {
    return _storeState.importing.infos
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
