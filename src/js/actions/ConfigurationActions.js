import AppDispatcher from '../dispatcher/AppDispatcher'
import {ImportError, ImportingData, RestoreConfiguration, ExportData} from '../constants/NevergreenConstants'
import LocalRepository from '../storage/LocalRepository'
import _ from 'lodash'
import DisplayStore from '../stores/DisplayStore'
import FetchedProjectsStore from '../stores/FetchedProjectsStore'
import SelectedProjectsStore from '../stores/SelectedProjectsStore'
import SuccessStore from '../stores/SuccessStore'
import TrayStore from '../stores/TrayStore'

const _storesWithConfiguration = [
  DisplayStore,
  FetchedProjectsStore,
  SelectedProjectsStore,
  SuccessStore,
  TrayStore
]

function validateData(data) {
  return _storesWithConfiguration.reduce((errors, store) => {
    const storeErrors = store.validate(data)
    if (!_.isEmpty(storeErrors)) {
      return errors.concat(storeErrors)
    }
    return errors
  }, [])
}

function dispatchError(errors) {
  AppDispatcher.dispatch({
    type: ImportError,
    errors
  })
}

module.exports = {

  importData(jsonData) {
    try {
      const data = JSON.parse(jsonData)

      const validationMessages = validateData(data)

      if (!_.isEmpty(validationMessages)) {
        dispatchError(validationMessages)
      } else {
        AppDispatcher.dispatch({
          type: ImportingData,
          data
        })

        LocalRepository.save(data).then(() => {
          AppDispatcher.dispatch({
            type: RestoreConfiguration,
            configuration: data,
            messages: ['Successfully imported']
          })
          AppDispatcher.dispatch({
            type: ExportData,
            configuration: data
          })
        }).catch((e) => {
          dispatchError(['Unable to import because of an error while trying to save to local storage', e.message])
        })
      }

    } catch (e) {
      dispatchError(['Unable to import because of syntactically Invalid JSON with the following errors:', e.message])
    }
  },

  refreshConfiguration() {
    LocalRepository.getConfiguration().then((configuration) => {
      AppDispatcher.dispatch({
        type: ExportData,
        configuration
      })
    })
  }
}
