const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()
const _ = require('lodash')
const Constants = require('../constants/NevergreenConstants')

const CHANGE_EVENT = 'selected-projects-change'

let _storeState = {}

const dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case Constants.TrayAdd:
    {
      _storeState[action.trayId] = []
      break
    }
    case Constants.TrayRemove:
    {
      delete _storeState[action.trayId]
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

  getAll() {
    return _storeState
  },

  getForTray(trayId) {
    return _storeState[trayId] || []
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
