import AppDispatcher from '../dispatcher/AppDispatcher'
import {EventEmitter} from 'events'
import {
  AppInit,
  RestoreConfiguration,
  BrokenBuildTimersChanged,
  BrokenBuildSoundsToggled
} from '../constants/NevergreenConstants'
import LocalRepository from '../storage/LocalRepository'
import _ from 'lodash'

const eventEmitter = new EventEmitter()
const storageKey = 'display'
const CHANGE_EVENT = 'display-change'

let _storeState = null

const dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case AppInit:
    {
      _storeState = Object.assign({
        showBrokenBuildTimers: false,
        showBrokenBuildSounds: false
      }, action.configuration[storageKey])
      break
    }
    case RestoreConfiguration:
    {
      _storeState = action.configuration[storageKey]
      break
    }
    case BrokenBuildTimersChanged:
    {
      _storeState.showBrokenBuildTimers = action.value === true
      break
    }
    case BrokenBuildSoundsToggled:
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
  dispatchToken,

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
