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

function _addProjectsToTray(action) {
  localforage.getItem(action.id).then(function (tray) {
    var updatedTray = _.merge(tray, {projects: action.projects})
    return localforage.setItem(action.id, updatedTray)
  }).then(function () {
    eventEmitter.emit(CHANGE_EVENT)
  })
}

function _updateTrays(trays) {
  var newTrayIds = trays.map(function (tray) {
    return tray.id
  })

  localforage.getItem('trays').then(function (existingTrayIds) {
    return Promise.all(
      _.difference(existingTrayIds, newTrayIds).map(function (idToRemove) {
        return localforage.removeItem(idToRemove)
      })
    )
  }).then(function () {
    return localforage.setItem('trays', newTrayIds)
  }).then(function () {
    return Promise.all(trays.map(function (tray) {
      return localforage.setItem(tray.id, tray)
    }))
  }).then(function () {
    eventEmitter.emit(CHANGE_EVENT)
  })
}

function _updatedSelectedProjectsForTray(trayId, selectedProjects) {
  localforage.getItem(trayId).then(function (tray) {
    tray.selected = selectedProjects
    return localforage.setItem(trayId, tray)
  }).then(function () {
    eventEmitter.emit(CHANGE_EVENT)
  })
}

function _updateMessages(messages) {
  localforage.setItem('messages', messages).then(function () {
    eventEmitter.emit(CHANGE_EVENT)
  })
}

function _registerWithDispatcher() {
  return AppDispatcher.register(function (action) {
    switch (action.type) {
      case Constants.PasswordEncrypted:
      case Constants.TrayAdd:
      case Constants.TrayRemove:
      {
        AppDispatcher.waitFor([TrayStore.dispatchToken])
        _updateTrays(TrayStore.getAll())
        break
      }
      case Constants.ProjectsFetched:
      {
        _addProjectsToTray(action)
        break
      }
      case Constants.ProjectSelected:
      case Constants.ProjectUnselected:
      {
        AppDispatcher.waitFor([SelectedProjectsStore.dispatchToken])
        _updatedSelectedProjectsForTray(action.trayId, SelectedProjectsStore.getForTray(action.trayId))
        break
      }
      case Constants.MessageAdd:
      case Constants.MessageRemove:
      {
        AppDispatcher.waitFor([SuccessStore.dispatchToken])
        _updateMessages(SuccessStore.getAll())
        break
      }
    }

    return true
  })
}

module.exports = {
  dispatchToken: null,

  registerWithDispatcher: function () {
    this.dispatchToken = _registerWithDispatcher()
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
