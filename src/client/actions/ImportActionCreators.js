import {fromJS, List} from 'immutable'
import {IMPORT_ERROR, IMPORT_SUCCESS, IMPORTING} from './Actions'

export function importing() {
  return {type: IMPORTING}
}

export function importError(errors) {
  return {type: IMPORT_ERROR, errors: List(errors)}
}

export function importSuccess(configuration) {
  return {
    type: IMPORT_SUCCESS,
    data: fromJS(configuration),
    messages: List.of('Successfully imported')
  }
}
