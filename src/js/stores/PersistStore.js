var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var _ = require('lodash')
var Constants = require('../constants/NevergreenConstants')
var localforage = require('localforage')
var Promise = require('promise')
var SelectProjectActions = require('../actions/SelectProjectActions')
var TrayActions = require('../actions/TrayActions')
var TrayStore = require('./TrayStore')
var SelectedProjectsStore = require('./SelectedProjectsStore')
var SuccessStore = require('./SuccessStore')
var SuccessActions = require('../actions/SuccessActions')

var CHANGE_EVENT = 'storage-change'

function addProjectsToTray(action) {
  localforage.getItem(action.id).then(function (tray) {
    var updatedTray = _.merge(tray, {projects: action.projects})
    return localforage.setItem(action.id, updatedTray)
  }).then(function () {
    eventEmitter.emit(CHANGE_EVENT)
  })
}

function updateTrays(trays) {
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

function updatedSelectedProjectsForTray(trayId, selectedProjects) {
  localforage.getItem(trayId).then(function (tray) {
    tray.selected = selectedProjects
    return localforage.setItem(trayId, tray)
  }).then(function () {
    eventEmitter.emit(CHANGE_EVENT)
  })
}

function updateMessages(messages) {
  localforage.setItem('messages', messages).then(function () {
    eventEmitter.emit(CHANGE_EVENT)
  })
}

function registerWithDispatcher() {
  return AppDispatcher.register(function (action) {
    switch (action.type) {
      case Constants.PasswordEncrypted:
      case Constants.TrayAdd:
      case Constants.TrayRemove:
      {
        AppDispatcher.waitFor([TrayStore.dispatchToken])
        updateTrays(TrayStore.getAll())
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
    }

    return true
  })
}

function dispatchActions(tray) {
  TrayActions._dispatchTrayAdded(tray.id, tray.url, tray.username)
  if (tray.password) {
    TrayActions._dispatchPasswordEncrypted(tray.id, tray.password)
  }
  if (tray.projects) {
    TrayActions._dispatchProjectsLoaded(tray.id, tray.projects)
  }
  if (tray.selected) {
    SelectProjectActions.selectProject(tray.id, tray.selected)
  }
  TrayActions.refreshTray(tray)
}

module.exports = {
  dispatchToken: null,

  init: function () {
    localforage.config({
      name: 'nevergreen',
      storeName: 'nevergreen'
    })

    return localforage.getItem('trays').then(function (trayIds) {
      if (_.isNull(trayIds)) {
        return localforage.setItem('trays', [])
      }
    }).then(function () {
      return localforage.getItem('messages')
    }).then(function (messages) {
      if (_.isNull(messages)) {
        return localforage.setItem('messages', ['=(^.^)='])
      }
    })
  },

  load: function () {
    if (this.dispatchToken) {
      AppDispatcher.unregister(this.dispatchToken)
    }

    localforage.getItem('trays').then(function (trayIds) {
      return Promise.all(trayIds.map(function (trayId) {
        return localforage.getItem(trayId)
      }))
    }).then(function (trays) {
      trays.forEach(dispatchActions)
    }).then(function () {
      return localforage.getItem('messages')
    }).then(function (messages) {
      messages.forEach(function (message) {
        SuccessActions.addMessage(message)
      })
    }).then(function () {
      this.dispatchToken = registerWithDispatcher()
    }.bind(this))
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
