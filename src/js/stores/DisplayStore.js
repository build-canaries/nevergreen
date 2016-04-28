const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()
const Constants = require('../constants/NevergreenConstants')
const LocalRepository = require('../storage/LocalRepository')
const _ = require('lodash')

const storageKey = 'display'
const CHANGE_EVENT = 'display-change'

let _storeState = null

const dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case Constants.AppInit:
    {
      _storeState = Object.assign({
        showBrokenBuildTimers: false,
        showBrokenBuildSounds: false
      }, action.configuration[storageKey])
      break
    }
    case Constants.RestoreConfiguration:
    {
      _storeState = action.configuration[storageKey]
      break
    }
    case Constants.BrokenBuildTimersChanged:
    {
      _storeState.showBrokenBuildTimers = action.value === true
      break
    }
    case Constants.BrokenBuildSoundsToggled:
    {
      _storeState.showBrokenBuildSounds = action.value === true
      break
    }
    default :
    {
      return true
    }
  }

  LocalRepository.setItem(storageKey, _storeState)
  eventEmitter.emit(CHANGE_EVENT)
  return true
})

module.exports = {
  dispatchToken: dispatchToken,

  areBrokenBuildTimersEnabled() {
    return _storeState.showBrokenBuildTimers
  },

  areBrokenBuildSoundsEnabled() {
    return _storeState.showBrokenBuildSounds
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  },

  validate(obj) {
    if (!_.has(obj, storageKey)) {
      return [`The top level key ${storageKey} is missing!`]
    }
  }
}
