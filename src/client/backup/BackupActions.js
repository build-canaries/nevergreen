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

export const IMPORTED_DATA = 'IMPORTED_DATA'
export function importedData(data) {
  return {
    type: IMPORTED_DATA,
    configuration: data,
    messages: ['Successfully imported']
  }
}

export const EXPORTING_DATA = 'EXPORTING_DATA'
export function exportingData() {
  return {
    type: EXPORTING_DATA
  }
}

export const EXPORTED_DATA = 'EXPORTED_DATA'
export function exportedData(data) {
  return {
    type: EXPORTED_DATA,
    configuration: data
  }
}

export const EXPORT_ERROR = 'EXPORT_ERROR'
export function exportError(errors) {
  return {
    type: EXPORT_ERROR,
    errors
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
          AppDispatcher.dispatch(importedData(data))
          exportData()(AppDispatcher)
        }).catch((e) => {
          AppDispatcher.dispatch(importError(['Unable to import because of an error while trying to save to local storage', e.message]))
        })
      }
    } catch (e) {
      AppDispatcher.dispatch(importError(['Unable to import because of syntactically Invalid JSON with the following errors:', e.message]))
    }
  }
}

export function exportData() {
  return function (AppDispatcher) {
    AppDispatcher.dispatch(exportingData())

    LocalRepository.getConfiguration().then((configuration) => {
      AppDispatcher.dispatch(exportedData(configuration))
    }).catch((e) => {
      AppDispatcher.dispatch(exportError(['Unable to export because of an error while trying to load from local storage', e.message]))
    })
  }
}
