const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()
const Constants = require('../constants/NevergreenConstants')

const CHANGE_EVENT = 'storage-change'

let _storeState = null

const dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case Constants.AppInit:
    {
      _storeState = {
        configuration: {},
        importing: false,
        exporting: true,
        importErrors: [],
        importInfos: []
      }
      break
    }
    case Constants.RestoreConfiguration:
    {
      _storeState.importing = false
      _storeState.importInfos = action.messages
      break
    }
    case Constants.ImportingData:
    {
      _storeState.importing = true
      _storeState.exporting = true
      _storeState.importErrors = []
      _storeState.importInfos = []
      break
    }
    case Constants.ImportError:
    {
      _storeState.importing = false
      _storeState.exporting = false
      _storeState.importErrors = action.messages
      _storeState.importInfos = []
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

  getImportErrors() {
    return _storeState.importErrors
  },

  getImportInfos() {
    return _storeState.importInfos
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
