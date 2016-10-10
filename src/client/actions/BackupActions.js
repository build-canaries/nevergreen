import Immutable from 'immutable'
import LocalRepository from '../common/repo/LocalRepository'
import _ from 'lodash'
import {validate} from '../common/repo/Data'
import {fromJson} from '../common/Json'

export const IMPORT_ERROR = 'IMPORT_ERROR'
export function importError(errors) {
  return {
    type: IMPORT_ERROR,
    errors: Immutable.List(errors)
  }
}

export const IMPORTING_DATA = 'IMPORTING_DATA'
export function importingData(data) {
  return {
    type: IMPORTING_DATA,
    data: Immutable.fromJS(data)
  }
}

export const IMPORTED_DATA = 'IMPORTED_DATA'
export function importedData(configuration) {
  return {
    type: IMPORTED_DATA,
    data: Immutable.fromJS(configuration),
    messages: Immutable.List(['Successfully imported'])
  }
}

export const LOADING_CONFIGURATION = 'LOADING_CONFIGURATION'
export function loadingConfiguration() {
  return {
    type: LOADING_CONFIGURATION
  }
}

export const CONFIGURATION_LOADED = 'CONFIGURATION_LOADED'
export function configurationLoaded(configuration) {
  return {
    type: CONFIGURATION_LOADED,
    data: Immutable.fromJS(configuration)
  }
}

export const CONFIGURATION_LOAD_ERROR = 'CONFIGURATION_LOAD_ERROR'
export function configurationLoadError(errors) {
  return {
    type: CONFIGURATION_LOAD_ERROR,
    errors: Immutable.List(errors)
  }
}

export function loadConfiguration() {
  return function (dispatch) {
    dispatch(loadingConfiguration())

    return LocalRepository.load()
      .then((configuration) => dispatch(configurationLoaded(configuration)))
      .catch((e) => dispatch(configurationLoadError(['Unable to load configuration because of an error', e.message])))
  }
}

export function importData(jsonData) {
  return function (dispatch) {
    try {
      const data = fromJson(jsonData)
      const validationMessages = validate(data)

      if (!_.isEmpty(validationMessages)) {
        dispatch(importError(validationMessages))
      } else {
        dispatch(importingData(data))

        // TODO: don't save here, just update the store and let the store subscriber persist as per normal?
        return LocalRepository.save(data)
          .then(() => dispatch(importedData(data)))
          .catch((e) => dispatch(importError(['Unable to import because of an error while trying to save to local storage', e.message])))
      }
    } catch (e) {
      dispatch(importError(['Unable to import because of syntactically invalid JSON with the following errors:', e]))
    }
  }
}
