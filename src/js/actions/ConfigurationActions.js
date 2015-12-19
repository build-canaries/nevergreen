const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')
const Promise = require('promise')
const LocalRepository = require('../storage/LocalRepository')
const TrayActions = require('../actions/TrayActions')
const SelectProjectActions = require('../actions/SelectProjectActions')
const SuccessActions = require('../actions/SuccessActions')
const validate = require('validate.js')

const _importValidation = {
  trays: {
    stringArray: true
  },
  messages: {
    stringArray: true
  }
}

function dispatchError(messages) {
  AppDispatcher.dispatch({
    type: Constants.ImportError,
    messages: messages
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

  importData(jsonData) {
    try {
      const data = JSON.parse(jsonData)

      const validationMessages = validate(data, _importValidation)

      if (validationMessages) {
        dispatchError(validationMessages)
      } else {
        AppDispatcher.dispatch({
          type: Constants.ImportingData,
          data: data
        })

        LocalRepository.save(data)
          .then(() => {
            AppDispatcher.dispatch({
              type: Constants.ImportedData,
              data: data
            })
          })
          .then(this.load)
          .catch(e => {
            dispatchError([`Unable to import - ${e.message}`])
          })
      }

    } catch (e) {
      dispatchError([`Invalid JSON - ${e.message}`])
    }
  },

  load() {
    return LocalRepository.getItem('trays')
      .then(trayIds => {
        return Promise.all(trayIds.map(trayId => {
          return LocalRepository.getItem(trayId)
        }))
      })
      .then(trays => {
        trays.forEach(dispatchTrackingActions)
        return LocalRepository.getItem('messages')
      })
      .then(messages => {
        messages.forEach(dispatchSuccessActions)
        return LocalRepository.getConfiguration()
      })
      .then(dispatchLoaded)
  }

}
