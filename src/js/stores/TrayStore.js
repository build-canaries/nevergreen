import AppDispatcher from '../dispatcher/AppDispatcher'
import {EventEmitter} from 'events'
import _ from 'lodash'
import Constants from '../constants/NevergreenConstants'
import LocalRepository from '../storage/LocalRepository'
import nameGenerator from 'project-name-generator'

const eventEmitter = new EventEmitter()
const storageKey = 'tray'
const CHANGE_EVENT = 'tray-change'

let _storeState = null

function addTray(action) {
  _storeState.trays[action.trayId] = {
    name: _.startCase(nameGenerator().spaced),
    trayId: action.trayId,
    url: action.url,
    username: action.username
  }
}

function updateTray(action) {
  _storeState.trays[action.trayId].name = action.name
  _storeState.trays[action.trayId].url = action.url
  _storeState.trays[action.trayId].username = action.username
}

function removeTray(trayId) {
  delete _storeState.trays[trayId]
}

function setTrayError(trayId, error) {
  _storeState.trays[trayId].error = error
}

function clearTrayError(trayId) {
  _storeState.trays[trayId].error = null
}

function setTrayFetching(trayId) {
  _storeState.trays[trayId].fetching = true
}

function setTrayFetched(trayId) {
  _storeState.trays[trayId].fetching = false
}

function setTrayTimestamp(trayId, timestamp) {
  _storeState.trays[trayId].timestamp = timestamp
}

function setTrayPassword(trayId, password) {
  _storeState.trays[trayId].password = password
}

const dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case Constants.AppInit:
    {
      _storeState = action.configuration[storageKey] || {
          trays: {}
        }
      break
    }
    case Constants.RestoreConfiguration:
    {
      _storeState = action.configuration[storageKey]
      break
    }
    case Constants.PasswordEncrypted:
    {
      setTrayPassword(action.trayId, action.password)
      clearTrayError(action.trayId)
      break
    }
    case Constants.TrayAdd:
    {
      addTray(action)
      break
    }
    case Constants.TrayUpdate:
    {
      updateTray(action)
      break
    }
    case Constants.TrayRemove:
    {
      removeTray(action.trayId)
      break
    }
    case Constants.ProjectsFetching:
    {
      setTrayFetching(action.trayId)
      clearTrayError(action.trayId)
      break
    }
    case Constants.ProjectsFetched:
    {
      setTrayFetched(action.trayId)
      clearTrayError(action.trayId)
      setTrayTimestamp(action.trayId, action.timestamp)
      break
    }
    case Constants.ProjectsFetchError:
    {
      setTrayFetched(action.trayId)
      setTrayError(action.trayId, action.error)
      setTrayTimestamp(action.trayId, action.timestamp)
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

  getAll() {
    return _.values(_storeState.trays)
  },

  getById(trayId) {
    return _storeState.trays[trayId]
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
    if (!_.has(obj, [storageKey, 'trays'])) {
      return [`The nested key ${storageKey}.trays is missing!`]
    }
    if (!_.isPlainObject(obj[storageKey].trays)) {
      return [`The nested key ${storageKey}.trays must be an object!`]
    }
  }

}
