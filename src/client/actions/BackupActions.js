import Immutable from 'immutable'
import LocalRepository from '../common/repo/LocalRepository'
import _ from 'lodash'
import {validate, filter} from '../common/repo/Data'
import {fromJson} from '../common/Json'
import {migrate} from '../common/repo/Migrations'

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

export function importData(jsonData) {
  return function (dispatch) {
    try {
      const data = filter(migrate(fromJson(jsonData)))
      const validationMessages = validate(data)

      if (!_.isEmpty(validationMessages)) {
        dispatch(importError(validationMessages))
      } else {
        dispatch(importingData(data))

        return LocalRepository.save(data)
          .then(() => dispatch(importedData(data)))
          .catch((e) => dispatch(importError(['Unable to import because of an error while trying to save to local storage', e.message])))
      }
    } catch (e) {
      dispatch(importError(['Unable to import because of syntactically invalid JSON with the following errors:', e]))
    }
  }
}
