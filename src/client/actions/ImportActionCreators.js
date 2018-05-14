import Immutable from 'immutable'
import {IMPORT_ERROR, IMPORT_SUCCESS, IMPORTING} from './Actions'

export function importing() {
  return {type: IMPORTING}
}

export function importError(errors) {
  return {type: IMPORT_ERROR, errors: Immutable.List(errors)}
}

export function importSuccess(configuration) {
  return {
    type: IMPORT_SUCCESS,
    data: Immutable.fromJS(configuration),
    messages: Immutable.List(['Successfully imported'])
  }
}
