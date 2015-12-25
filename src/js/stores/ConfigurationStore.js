const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()
const _ = require('lodash')
const Constants = require('../constants/NevergreenConstants')
const TrayStore = require('./TrayStore')
const SelectedProjectsStore = require('./SelectedProjectsStore')
const SuccessStore = require('./SuccessStore')
const LocalRepository = require('../storage/LocalRepository')

const CHANGE_EVENT = 'storage-change'

let _storeState = {
  loading: true,
  configuration: {
    trays: [],
    messages: [],
    displaySettings: {
      showBrokenBuildTimers: false
    }
  },
  validationMessages: null
}

function resetImportError() {
  _storeState.validationMessages = null
}

function setImportError(messages) {
  _storeState.validationMessages = messages
}

function setLoading() {
  _storeState.loading = true
}

function setLoaded() {
  _storeState.loading = false
}

function addProjectsToTray(action) {
  _storeState.configuration[action.trayId].projects = action.projects
}

function addTray(tray) {
  _storeState.configuration.trays = _storeState.configuration.trays.concat(tray.trayId)
  _storeState.configuration[tray.trayId] = _.pick(tray, ['trayId', 'url', 'username', 'password'])
}

function removeTray(trayId) {
  _.remove(_storeState.configuration.trays, id => {
    return id === trayId
  })
}

function setBrokenBuildTimers(value) {
    _storeState.configuration.displaySettings.showBrokenBuildTimers = value === true
}

function updatedSelectedProjectsForTray(trayId, selectedProjects) {
  _storeState.configuration[trayId].selected = selectedProjects
}

function updateMessages(messages) {
  _storeState.configuration.messages = messages
}

const dispatchToken = AppDispatcher.register(action => {
  if (_storeState.loading) {
    switch (action.type) {
      case Constants.ConfigurationLoaded:
      {
        setLoaded()
        _storeState.configuration = action.configuration
        resetImportError()
        break
      }
      case Constants.ImportError:
      {
        setLoaded()
        setImportError(action.messages)
        break
      }
      default:
      {
        return true
      }
    }
  } else {
    resetImportError()

    switch (action.type) {
      case Constants.PasswordEncrypted:
      case Constants.TrayAdd:
      {
        AppDispatcher.waitFor([TrayStore.dispatchToken])
        addTray(TrayStore.getById(action.trayId))
        break
      }
      case Constants.TrayRemove:
      {
        removeTray(action.trayId)
        break
      }
      case Constants.ProjectsFetched:
      {
        addProjectsToTray(action)
        break
      }
      case Constants.ProjectSelected:
      case Constants.ProjectUnselected:
      {
        AppDispatcher.waitFor([SelectedProjectsStore.dispatchToken])
        updatedSelectedProjectsForTray(action.trayId, SelectedProjectsStore.getForTray(action.trayId))
        break
      }
      case Constants.MessageAdd:
      case Constants.MessageRemove:
      {
        AppDispatcher.waitFor([SuccessStore.dispatchToken])
        updateMessages(SuccessStore.getAll())
        break
      }
      case Constants.BrokenBuildTimersChanged:
      {
          setBrokenBuildTimers(action.value)
          break
      }
      case Constants.ImportingData:
      {
        setLoading()
        break
      }
      case Constants.ImportError:
      {
        setImportError(action.messages)
        break
      }
      default:
      {
        return true
      }
    }
  }

  LocalRepository.save(_storeState.configuration).then(() => {
    eventEmitter.emit(CHANGE_EVENT)
  })

  return true
})

module.exports = {
  dispatchToken: dispatchToken,

  getConfiguration() {
    return _storeState.configuration
  },

  areBrokenBuildTimersEnabled() {
    return _storeState.configuration.displaySettings.showBrokenBuildTimers
  },

  isLoading() {
    return _storeState.loading
  },

  getImportError() {
    return _storeState.validationMessages
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
