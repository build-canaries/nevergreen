var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var _ = require('lodash')
var Constants = require('../constants/NevergreenConstants')
var TrayStore = require('./TrayStore')
var SelectedProjectsStore = require('./SelectedProjectsStore')
var SuccessStore = require('./SuccessStore')
var LocalRepository = require('../storage/LocalRepository')

var CHANGE_EVENT = 'storage-change'

var _storeState = {
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
  _.remove(_storeState.configuration.trays, function (id) {
    return id === trayId
  })
}

function setBrokenBuildTimers(value) {
    _storeState.configuration.displaySettings.showBrokenBuildTimers = (value === true)
}

function updatedSelectedProjectsForTray(trayId, selectedProjects) {
  _storeState.configuration[trayId].selected = selectedProjects
}

function updateMessages(messages) {
  _storeState.configuration.messages = messages
}

var dispatchToken = AppDispatcher.register(function (action) {
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

  LocalRepository.save(_storeState.configuration).then(function () {
    eventEmitter.emit(CHANGE_EVENT)
  })

  return true
})

module.exports = {
  dispatchToken: dispatchToken,

  getConfiguration: function () {
    return _storeState.configuration
  },

  areBrokenBuildTimersEnabled: function () {
    return _storeState.configuration.displaySettings.showBrokenBuildTimers
  },

  isLoading: function () {
    return _storeState.loading
  },

  getImportError: function () {
    return _storeState.validationMessages
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
