const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')
const LocalRepository = require('../storage/LocalRepository')
const validate = require('validate.js')

const _importValidation = {
  display: {
    presence: true
  },
  fetchedProjects: {
    presence: true
  },
  interestingProjects: {
    presence: true
  },
  selectedProjects: {
    presence: true
  },
  success: {
    presence: true
  },
  tray: {
    presence: true
  }
}

function dispatchError(messages) {
  AppDispatcher.dispatch({
    type: Constants.ImportError,
    messages: messages
  })
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

        LocalRepository.save(data).then(() => {
          AppDispatcher.dispatch({
            type: Constants.RestoreConfiguration,
            configuration: data
          })
          AppDispatcher.dispatch({
            type: Constants.ExportData,
            configuration: data
          })
        }).catch(e => {
          dispatchError([`Unable to import - ${e.message}`])
        })
      }

    } catch (e) {
      dispatchError([`Invalid JSON - ${e.message}`])
    }
  },

  exportData() {
    LocalRepository.getConfiguration().then(configuration => {
      AppDispatcher.dispatch({
        type: Constants.ExportData,
        configuration: configuration
      })
    })
  }
}
