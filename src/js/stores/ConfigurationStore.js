import AppDispatcher from '../dispatcher/AppDispatcher'
import {EventEmitter} from 'events'
import Constants from '../constants/NevergreenConstants'

const eventEmitter = new EventEmitter()
const CHANGE_EVENT = 'storage-change'

let _storeState = null

const dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case Constants.AppInit:
    {
      _storeState = {
        configuration: action.configuration,
        importing: false,
        exporting: true
      }
      break
    }
    case Constants.RestoreConfiguration:
    {
      _storeState.importing = false
      break
    }
    case Constants.ImportingData:
    {
      _storeState.importing = true
      _storeState.exporting = true
      break
    }
    case Constants.ImportError:
    {
      _storeState.importing = false
      _storeState.exporting = false
      break
    }
    case Constants.ExportData:
    {
      _storeState.exporting = false
      _storeState.configuration = action.configuration
      break
    }
    default:
    {
      return true
    }
  }

  eventEmitter.emit(CHANGE_EVENT)
  return true
})

module.exports = {
  dispatchToken: dispatchToken,

  getConfiguration() {
    return _storeState.configuration
  },

  isImporting() {
    return _storeState.importing
  },

  isExporting() {
    return _storeState.exporting
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
