var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var _ = require('lodash')
var Constants = require('../constants/NevergreenConstants')
var localforage = require('localforage')
var Promise = require('promise')
var TrayStore = require('./TrayStore')
var SelectedProjectsStore = require('./SelectedProjectsStore')
var SuccessStore = require('./SuccessStore')

var CHANGE_EVENT = 'storage-change'

var _storeState = {}

function getConfiguration() {
  var configuration = {}
  return localforage.iterate(function (value, key) {
    configuration[key] = value
  }).then(function () {
    return configuration
  })
}

function addProjectsToTray(action) {
  return localforage.getItem(action.id)
    .then(function (tray) {
      tray.projects = action.projects
      return localforage.setItem(action.id, tray)
    })
}

function updateTrays(trays) {
  var newTrayIds = trays.map(function (tray) {
    return tray.id
  })

  return localforage.getItem('trays')
    .then(function (existingTrayIds) {
      return Promise.all(
        _.difference(existingTrayIds, newTrayIds).map(function (idToRemove) {
          return localforage.removeItem(idToRemove)
        })
      )
    })
    .then(function () {
      return localforage.setItem('trays', newTrayIds)
    })
    .then(function () {
      return Promise.all(trays.map(function (tray) {
        return localforage.setItem(tray.id, _.pick(tray, ['id', 'url', 'username', 'password']))
      }))
    })
}

function updatedSelectedProjectsForTray(trayId, selectedProjects) {
  return localforage.getItem(trayId)
    .then(function (tray) {
      tray.selected = selectedProjects
      return localforage.setItem(trayId, tray)
    })
}

function updateMessages(messages) {
  return localforage.setItem('messages', messages)
}

function registerWithDispatcher() {
  return AppDispatcher.register(function (action) {
    var savingPromise = null

    if (_storeState.importing) {
      switch (action.type) {
        case Constants.ImportLoaded:
        case Constants.ImportError:
        {
          _storeState.importing = false
          _storeState.importError = action.message
          savingPromise = Promise.resolve()
          break
        }
      }
    } else {
      _storeState.importError = null

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
          _storeState.importing = true
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
        .then(getConfiguration)
        .then(function (configuration) {
          _storeState.configuration = configuration
          eventEmitter.emit(CHANGE_EVENT)
        })
    }

    return true
  })
}

module.exports = {
  dispatchToken: null,

  getConfiguration: function () {
    return _storeState.configuration
  },

  isImporting: function () {
    return _storeState.importing
  },

  getImportError: function () {
    return _storeState.importError
  },

  init: function () {
    return getConfiguration().then(function (configuration) {
      _storeState.configuration = configuration
      this.dispatchToken = registerWithDispatcher()
    })
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
