var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var _ = require('lodash')
var Constants = require('../constants/NevergreenConstants')

var CHANGE_EVENT = 'tray-change'

var _storeState = {}

function createTray(action) {
  return {
    id: action.id,
    url: action.url,
    username: action.username
  }
}

var dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case Constants.PasswordEncrypted:
    {
      _storeState[action.id].password = action.password
      _storeState[action.id].error = null
      break
    }
    case Constants.TrayAdd:
    {
      _storeState[action.id] = createTray(action)
      break
    }
    case Constants.TrayRemove:
    {
      delete _storeState[action.id]
      break
    }
    case Constants.ProjectsFetching:
    {
      _storeState[action.id].fetching = true
      _storeState[action.id].error = null
      break
    }
    case Constants.ProjectsFetched:
    {
      _storeState[action.id].fetching = false
      _storeState[action.id].error = null
      break
    }
    case Constants.ApiError:
    {
      _storeState[action.id].fetching = false
      _storeState[action.id].error = action.error
      break
    }
    case Constants.ImportedData:
    {
      _storeState = {}
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

  getAll: function () {
    return _.values(_storeState)
  },

  getById: function (trayId) {
    return _storeState[trayId]
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
