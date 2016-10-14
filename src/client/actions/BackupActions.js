import Immutable from 'immutable'
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

      if (_.isEmpty(validationMessages)) {
        dispatch(importedData(data))
      } else {
        dispatch(importError(validationMessages))
      }
    } catch (e) {
      dispatch(importError(['Unable to import because of syntactically invalid JSON with the following errors:', e]))
    }
  }
}
