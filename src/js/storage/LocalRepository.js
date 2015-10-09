var localforage = require('localforage')
var Promise = require('promise')
var _ = require('lodash')
var TrayActions = require('../actions/TrayActions')
var SelectProjectActions = require('../actions/SelectProjectActions')
var SuccessActions = require('../actions/SuccessActions')

function _setIfMissing(key, existing, defaultValue) {
  if (_.isNull(existing)) {
    return localforage.setItem(key, defaultValue)
  }
}

function _dispatchTrackingActions(tray) {
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

function _dispatchSuccessActions(message) {
  SuccessActions.addMessage(message)
}

module.exports = {
  init: function () {
    localforage.config({
      name: 'nevergreen',
      storeName: 'nevergreen'
    })

    var keys = [
      'trays',
      'messages'
    ]

    var defaultValues = [
      [],
      ['=(^.^)=']
    ]

    return Promise.all(keys.map(function (key) {
      return localforage.getItem(key)
    })).then(function (existingValues) {
      var entriesWithDefaults = _.zip(keys, existingValues, defaultValues)
      return Promise.all(entriesWithDefaults.map(function (triple) {
        return _setIfMissing.apply(this, triple)
      }))
    })
  },

  load: function () {
    return localforage.getItem('trays').then(function (trayIds) {
      return Promise.all(trayIds.map(function (trayId) {
        return localforage.getItem(trayId)
      }))
    }).then(function (trays) {
      trays.forEach(_dispatchTrackingActions)
      return localforage.getItem('messages')
    }).then(function (messages) {
      messages.forEach(_dispatchSuccessActions)
    }.bind(this))
  }
}