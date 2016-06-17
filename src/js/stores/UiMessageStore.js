import AppDispatcher from '../common/AppDispatcher'
import {EventEmitter} from 'events'
import {AppInit, KeyboardShortcuts} from '../NevergreenActions'
import {RESTORE_CONFIGURATION, IMPORTING_DATA, IMPORT_ERROR} from '../backup/BackupActions'
import {MessageAdd, MessageRemove, MessageInvalidInput} from '../success/SuccessActions'

const eventEmitter = new EventEmitter()
const CHANGE_EVENT = 'message-change'

let _storeState = null

eventEmitter.setMaxListeners(Infinity)

const dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case AppInit:
    case RESTORE_CONFIGURATION:
    {
      _storeState = {
        keyboardShortcuts: {
          cancel: null,
          show: false
        },
        success: {
          errors: []
        },
        importing: {
          errors: [],
          infos: action.messages || []
        }
      }
      break
    }
    case MessageInvalidInput:
    {
      _storeState.success.errors = action.errors
      break
    }
    case MessageAdd:
    case MessageRemove:
    {
      _storeState.success.errors = []
      break
    }
    case IMPORTING_DATA:
    {
      _storeState.importing.errors = []
      _storeState.importing.infos = []
      break
    }
    case IMPORT_ERROR:
    {
      _storeState.importing.errors = action.errors
      _storeState.importing.infos = []
      break
    }
    case KeyboardShortcuts:
    {
      if (action.show && _storeState.keyboardShortcuts.cancel) {
        _storeState.keyboardShortcuts.cancel()
      }
      _storeState.keyboardShortcuts.cancel = action.cancel
      _storeState.keyboardShortcuts.show = action.show
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

  getSuccessErrors() {
    return _storeState.success.errors
  },

  getImportErrors() {
    return _storeState.importing.errors
  },

  getImportInfos() {
    return _storeState.importing.infos
  },

  showKeyboardShortcuts() {
    return _storeState.keyboardShortcuts.show
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
