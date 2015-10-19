var AppDispatcher = require('../dispatcher/AppDispatcher')
var Constants = require('../constants/NevergreenConstants')
var Promise = require('promise')
var LocalRepository = require('../storage/LocalRepository')
var TrayActions = require('../actions/TrayActions')
var SelectProjectActions = require('../actions/SelectProjectActions')
var SuccessActions = require('../actions/SuccessActions')

function dispatchError(message) {
  AppDispatcher.dispatch({
    type: Constants.ImportError,
    message: message
  })
}

function dispatchLoaded(configuration) {
  AppDispatcher.dispatch({
    type: Constants.ConfigurationLoaded,
    configuration: configuration
  })
}

function dispatchTrackingActions(tray) {
  TrayActions._dispatchTrayAdded(tray.trayId, tray.url, tray.username)
  if (tray.password) {
    TrayActions._dispatchPasswordEncrypted(tray.trayId, tray.password)
  }
  if (tray.projects) {
    TrayActions._dispatchProjectsLoaded(tray.trayId, tray.projects)
  }
  if (tray.selected) {
    SelectProjectActions.selectProject(tray.trayId, tray.selected)
  }
  TrayActions.refreshTray(tray)
}

function dispatchSuccessActions(message) {
  SuccessActions.addMessage(message)
}

module.exports = {

  importData: function (jsonData) {
    try {
      var data = JSON.parse(jsonData)

      AppDispatcher.dispatch({
        type: Constants.ImportingData,
        data: data
      })

      LocalRepository.importData(data)
        .then(function () {
          AppDispatcher.dispatch({
            type: Constants.ImportedData,
            data: data
          })
        })
        .then(this.load)
        .catch(function (e) {
          dispatchError('Unable to import - ' + e.message)
        })

    } catch (e) {
      dispatchError('Invalid JSON - ' + e.message)
    }
  },

  load: function () {
    return LocalRepository.getItem('trays')
      .then(function (trayIds) {
        return Promise.all(trayIds.map(function (trayId) {
          return LocalRepository.getItem(trayId)
        }))
      })
      .then(function (trays) {
        trays.forEach(dispatchTrackingActions)
        return LocalRepository.getItem('messages')
      })
      .then(function (messages) {
        messages.forEach(dispatchSuccessActions)
        return LocalRepository.getConfiguration()
      })
      .then(dispatchLoaded)
  }

}
