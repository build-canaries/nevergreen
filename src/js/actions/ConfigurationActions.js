const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')
const LocalRepository = require('../storage/LocalRepository')
const validate = require('validate.js')
const DisplayStore = require('../stores/DisplayStore')
const FetchedProjectsStore = require('../stores/FetchedProjectsStore')
const SelectedProjectsStore = require('../stores/SelectedProjectsStore')
const SuccessStore = require('../stores/SuccessStore')
const TrayStore = require('../stores/TrayStore')

const _storesWithConfiguration = [
  DisplayStore,
  FetchedProjectsStore,
  SelectedProjectsStore,
  SuccessStore,
  TrayStore
]

const _importValidation = _storesWithConfiguration.reduce((previous, current) => {
  previous[current.storageKey] = {
    object: true
  }
  Object.keys(current.validation).map(key => {
    previous[`${current.storageKey}.${key}`] = current.validation[key]
  })
  return previous
}, {})

function dispatchError(errors) {
  AppDispatcher.dispatch({
    type: Constants.ImportError,
    errors: errors
  })
}

module.exports = {

  importData(jsonData) {
    try {
      const data = JSON.parse(jsonData)

      const validationMessages = validate(data, _importValidation)

      if (validationMessages) {
        dispatchError(['Unable to import because of semantically invalid JSON with the following errors:'].concat(validationMessages))
      } else {
        AppDispatcher.dispatch({
          type: Constants.ImportingData,
          data: data
        })

        LocalRepository.save(data).then(() => {
          AppDispatcher.dispatch({
            type: Constants.RestoreConfiguration,
            configuration: data,
            errors: ['Successfully imported']
          })
          AppDispatcher.dispatch({
            type: Constants.ExportData,
            configuration: data
          })
        }).catch(e => {
          dispatchError(['Unable to import because of an error while trying to save to local storage', e.message])
        })
      }

    } catch (e) {
      dispatchError(['Unable to import because of syntactically Invalid JSON with the following errors:', e.message])
    }
  },

  refreshConfiguration() {
    LocalRepository.getConfiguration().then(configuration => {
      AppDispatcher.dispatch({
        type: Constants.ExportData,
        configuration: configuration
      })
    })
  }
}
