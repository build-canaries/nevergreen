import AppDispatcher from '../common/AppDispatcher'
import LocalRepository from '../common/LocalRepository'
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

export const ImportError = 'import-error'
export function importError(errors) {
  AppDispatcher.dispatch({
    type: ImportError,
    errors
  })
}

export const ImportingData = 'importing-data'
export function importingData(data) {
  AppDispatcher.dispatch({
    type: ImportingData,
    data
  })
}

export const RestoreConfiguration = 'restore-configuration'
export function restoreConfiguration(data) {
  AppDispatcher.dispatch({
    type: RestoreConfiguration,
    configuration: data,
    messages: ['Successfully imported']
  })
}

export const ExportData = 'export-data'
export function exportData(data) {
  AppDispatcher.dispatch({
    type: ExportData,
    configuration: data
  })
}

export function importData(jsonData) {
  try {
    const data = JSON.parse(jsonData)

    const validationMessages = validateData(data)

    if (!_.isEmpty(validationMessages)) {
      importError(validationMessages)
    } else {
      importingData(data)

      LocalRepository.save(data).then(() => {
        restoreConfiguration(data)
        exportData(data)
      }).catch((e) => {
        importError(['Unable to import because of an error while trying to save to local storage', e.message])
      })
    }
  } catch (e) {
    importError(['Unable to import because of syntactically Invalid JSON with the following errors:', e.message])
  }
}

export function refreshConfiguration() {
  LocalRepository.getConfiguration().then((configuration) => {
    exportData(configuration)
  })
}
