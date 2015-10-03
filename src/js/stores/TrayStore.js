var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var _ = require('lodash')
var Constants = require('../constants/NevergreenConstants')

var CHANGE_EVENT = 'tray-change'

var _trays = {}

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
      _trays[action.id].password = action.password
      _trays[action.id].error = null
      break
    }
    case Constants.TrayAdd:
    {
      _trays[action.id] = createTray(action)
      break
    }
    case Constants.TrayRemove:
    {
      delete _trays[action.id]
      break
    }
    case Constants.ProjectsFetching:
    {
      _trays[action.id].fetching = true
      _trays[action.id].error = null
      break
    }
    case Constants.ProjectsFetched:
    {
      _trays[action.id].fetching = false
      _trays[action.id].error = null
      break
    }
    case Constants.ApiError:
    {
      _trays[action.id].fetching = false
      _trays[action.id].error = action.error
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
    return _.values(_trays)
  },

  getById: function (trayId) {
    return _trays[trayId]
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
