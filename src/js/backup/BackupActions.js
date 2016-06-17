import LocalRepository from '../common/LocalRepository'
import DisplayStore from '../stores/DisplayStore'
import FetchedProjectsStore from '../stores/FetchedProjectsStore'
import SelectedProjectsStore from '../stores/SelectedProjectsStore'
import SuccessStore from '../stores/SuccessStore'
import TrayStore from '../stores/TrayStore'
import _ from 'lodash'

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

export const IMPORT_ERROR = 'IMPORT_ERROR'
export function importError(errors) {
  return {
    type: IMPORT_ERROR,
    errors
  }
}

export const IMPORTING_DATA = 'IMPORTING_DATA'
export function importingData(data) {
  return {
    type: IMPORTING_DATA,
    data
  }
}

export const RESTORE_CONFIGURATION = 'RESTORE_CONFIGURATION'
export function restoreConfiguration(data) {
  return {
    type: RESTORE_CONFIGURATION,
    configuration: data,
    messages: ['Successfully imported']
  }
}

export const EXPORT_DATA = 'EXPORT_DATA'
export function exportData(data) {
  return {
    type: EXPORT_DATA,
    configuration: data
  }
}

export function importData(jsonData) {
  return function (AppDispatcher) {
    try {
      const data = JSON.parse(jsonData)

      const validationMessages = validateData(data)

      if (!_.isEmpty(validationMessages)) {
        AppDispatcher.dispatch(importError(validationMessages))
      } else {
        AppDispatcher.dispatch(importingData(data))

        LocalRepository.save(data).then(() => {
          AppDispatcher.dispatch(restoreConfiguration(data))
          AppDispatcher.dispatch(exportData(data))
        }).catch((e) => {
          AppDispatcher.dispatch(importError(['Unable to import because of an error while trying to save to local storage', e.message]))
        })
      }
    } catch (e) {
      AppDispatcher.dispatch(importError(['Unable to import because of syntactically Invalid JSON with the following errors:', e.message]))
    }
  }
}

export function refreshConfiguration() {
  return function (AppDispatcher) {
    LocalRepository.getConfiguration().then((configuration) => {
      AppDispatcher.dispatch(exportData(configuration))
    })
  }
}
