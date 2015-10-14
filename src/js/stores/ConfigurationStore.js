var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var _ = require('lodash')
var Constants = require('../constants/NevergreenConstants')
var Promise = require('promise')
var TrayStore = require('./TrayStore')
var SelectedProjectsStore = require('./SelectedProjectsStore')
var SuccessStore = require('./SuccessStore')
var LocalRepository = require('../storage/LocalRepository')

var CHANGE_EVENT = 'storage-change'

var _storeState = {
  loading: true,
  configuration: null,
  importError: null
}

function resetImportError() {
  _storeState.importError = null
}

function addProjectsToTray(action) {
  return LocalRepository.getItem(action.id)
    .then(function (tray) {
      tray.projects = action.projects
      return LocalRepository.setItem(action.id, tray)
    })
}

function updateTrays(trays) {
  var newTrayIds = trays.map(function (tray) {
    return tray.id
  })

  return LocalRepository.getItem('trays')
    .then(function (existingTrayIds) {
      return Promise.all(
        _.difference(existingTrayIds, newTrayIds).map(function (idToRemove) {
          return LocalRepository.removeItem(idToRemove)
        })
      )
    })
    .then(function () {
      return LocalRepository.setItem('trays', newTrayIds)
    })
    .then(function () {
      return Promise.all(trays.map(function (tray) {
        return LocalRepository.setItem(tray.id, _.pick(tray, ['id', 'url', 'username', 'password']))
      }))
    })
}

function updatedSelectedProjectsForTray(trayId, selectedProjects) {
  return LocalRepository.getItem(trayId)
    .then(function (tray) {
      tray.selected = selectedProjects
      return LocalRepository.setItem(trayId, tray)
    })
}

function updateMessages(messages) {
  return LocalRepository.setItem('messages', messages)
}

var dispatchToken = AppDispatcher.register(function (action) {
  var savingPromise = null

  if (_storeState.loading) {
    switch (action.type) {
      case Constants.ConfigurationLoaded:
      {
        _storeState.loading = false
        _storeState.configuration = action.configuration
        resetImportError()
        savingPromise = Promise.resolve()
        break
      }
      case Constants.ImportError:
      {
        _storeState.loading = false
        _storeState.importError = action.message
        savingPromise = Promise.resolve()
        break
      }
    }
  } else {
    resetImportError()

    switch (action.type) {
      case Constants.PasswordEncrypted:
      case Constants.TrayAdd:
      case Constants.TrayRemove:
      {
        AppDispatcher.waitFor([TrayStore.dispatchToken])
        savingPromise = updateTrays(TrayStore.getAll())
        break
      }
      case Constants.ProjectsFetched:
      {
        savingPromise = addProjectsToTray(action)
        break
      }
      case Constants.ProjectSelected:
      case Constants.ProjectUnselected:
      {
        AppDispatcher.waitFor([SelectedProjectsStore.dispatchToken])
        savingPromise = updatedSelectedProjectsForTray(action.trayId, SelectedProjectsStore.getForTray(action.trayId))
        break
      }
      case Constants.MessageAdd:
      case Constants.MessageRemove:
      {
        AppDispatcher.waitFor([SuccessStore.dispatchToken])
        savingPromise = updateMessages(SuccessStore.getAll())
        break
      }
      case Constants.ImportingData:
      {
        _storeState.loading = true
        savingPromise = Promise.resolve()
        break
      }
      case Constants.ImportError:
      {
        _storeState.importError = action.message
        savingPromise = Promise.resolve()
        break
      }
    }
  }

  if (!_.isNull(savingPromise)) {
    savingPromise
      .then(LocalRepository.getConfiguration)
      .then(function (configuration) {
        _storeState.configuration = configuration
        eventEmitter.emit(CHANGE_EVENT)
      })
  }

  return true
})

module.exports = {
  dispatchToken: dispatchToken,

  getConfiguration: function () {
    return _storeState.configuration
  },

  isImporting: function () {
    return _storeState.loading
  },

  getImportError: function () {
    return _storeState.importError
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
