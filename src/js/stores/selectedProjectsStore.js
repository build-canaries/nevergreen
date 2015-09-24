var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var _ = require('lodash')
var Constants = require('../constants/NevergreenConstants')

var CHANGE_EVENT = 'selected-projects-change'

var _selectedProjects = {}

var dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case Constants.TrayAdd:
    {
      _selectedProjects[action.id] = []
      break
    }
    case Constants.TrayRemove:
    {
      delete _selectedProjects[action.id]
      break
    }
    case Constants.ProjectSelected:
    {
      _selectedProjects[action.trayId] = _selectedProjects[action.trayId].concat(action.projectIds)
      break
    }
    case Constants.ProjectUnselected:
    {
      _selectedProjects[action.trayId] = _.difference(_selectedProjects[action.trayId], action.projectIds)
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
    return _selectedProjects
  },

  getForTray: function (trayId) {
    return _selectedProjects[trayId] || []
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
