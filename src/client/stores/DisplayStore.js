import AppDispatcher from '../common/AppDispatcher'
import {EventEmitter} from 'events'
import {AppInit} from '../NevergreenActions'
import {IMPORTED_DATA} from '../backup/BackupActions'
import {
  BrokenBuildTimersChanged,
  BrokenBuildSoundsToggled,
  BrokenBuildSoundFx
} from '../audio-visual/AudioVisualActions'
import LocalRepository from '../common/LocalRepository'
import _ from 'lodash'
import defaultBrokenBuildSoundFx from '../audio-visual/pacman_death.mp3'

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
        showBrokenBuildSounds: false,
        brokenBuildSoundFx: defaultBrokenBuildSoundFx
      }, action.configuration[storageKey])
      break
    }
    case IMPORTED_DATA:
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
    case BrokenBuildSoundFx:
    {
      _storeState.brokenBuildSoundFx = action.value
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

  brokenBuildSoundFx() {
    return _storeState.brokenBuildSoundFx
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
