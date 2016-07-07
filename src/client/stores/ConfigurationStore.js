import AppDispatcher from '../common/AppDispatcher'
import {EventEmitter} from 'events'
import {AppInit} from '../NevergreenActions'
import {
  IMPORTED_DATA,
  IMPORTING_DATA,
  IMPORT_ERROR,
  EXPORTING_DATA,
  EXPORTED_DATA,
  EXPORT_ERROR
} from '../backup/BackupActions'

const eventEmitter = new EventEmitter()
const CHANGE_EVENT = 'storage-change'

let _storeState = null

const dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case AppInit:
    {
      _storeState = {
        configuration: action.configuration,
        importing: false,
        exporting: true
      }
      break
    }
    case IMPORTED_DATA:
    {
      _storeState.importing = false
      break
    }
    case IMPORTING_DATA:
    {
      _storeState.importing = true
      break
    }
    case IMPORT_ERROR:
    {
      _storeState.importing = false
      break
    }
    case EXPORTING_DATA:
    {
      _storeState.exporting = true
      break
    }
    case EXPORTED_DATA:
    {
      _storeState.exporting = false
      _storeState.configuration = action.configuration
      break
    }
    case EXPORT_ERROR:
    {
      _storeState.exporting = false
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
  dispatchToken,

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
