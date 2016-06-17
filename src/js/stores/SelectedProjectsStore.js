import AppDispatcher from '../common/AppDispatcher'
import {EventEmitter} from 'events'
import {AppInit} from '../NevergreenActions'
import {RESTORE_CONFIGURATION} from '../backup/BackupActions'
import {ProjectSelected, ProjectUnselected} from '../tracking/tray/TrayActions'
import {TrayAdd, TrayRemove} from '../tracking/TrackingActions'
import _ from 'lodash'
import LocalRepository from '../common/LocalRepository'

const eventEmitter = new EventEmitter()
const storageKey = 'selectedProjects'
const CHANGE_EVENT = 'selected-projects-change'

let _storeState = null

const dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case AppInit:
    {
      _storeState = action.configuration[storageKey] || {}
      break
    }
    case RESTORE_CONFIGURATION:
    {
      _storeState = action.configuration[storageKey]
      break
    }
    case TrayAdd:
    {
      _storeState[action.trayId] = []
      break
    }
    case TrayRemove:
    {
      delete _storeState[action.trayId]
      break
    }
    case ProjectSelected:
    {
      _storeState[action.trayId] = _storeState[action.trayId].concat(action.projectIds)
      break
    }
    case ProjectUnselected:
    {
      _storeState[action.trayId] = _.difference(_storeState[action.trayId], action.projectIds)
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

  getAll() {
    return _storeState
  },

  getForTray(trayId) {
    return _storeState[trayId]
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
    if (!_.isPlainObject(obj[storageKey])) {
      return [`The top level key ${storageKey} must be an object!`]
    }
  }
}
