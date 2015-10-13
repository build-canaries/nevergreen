var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var _ = require('lodash')
var Constants = require('../constants/NevergreenConstants')

var CHANGE_EVENT = 'selected-projects-change'

var _storeState = {}

var dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case Constants.TrayAdd:
    {
      _storeState[action.id] = []
      break
    }
    case Constants.TrayRemove:
    {
      delete _storeState[action.id]
      break
    }
    case Constants.ProjectSelected:
    {
      _storeState[action.trayId] = _storeState[action.trayId].concat(action.projectIds)
      break
    }
    case Constants.ProjectUnselected:
    {
      _storeState[action.trayId] = _.difference(_storeState[action.trayId], action.projectIds)
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
    return _storeState
  },

  getForTray: function (trayId) {
    return _storeState[trayId] || []
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
