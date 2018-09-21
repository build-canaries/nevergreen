import {List} from 'immutable'
import {EXPORT_ERROR, EXPORT_SUCCESS, EXPORTING} from './Actions'

export function exporting() {
  return {type: EXPORTING}
}

export function exportSuccess(messages) {
  return {type: EXPORT_SUCCESS, messages: List(messages)}
}

export function exportError(errors) {
  return {type: EXPORT_ERROR, errors: List(errors)}
}
