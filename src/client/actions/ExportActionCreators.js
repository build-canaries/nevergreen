import Immutable from 'immutable'
import {EXPORT_ERROR, EXPORT_SUCCESS, EXPORTING} from './Actions'

export function exporting() {
  return {type: EXPORTING}
}

export function exportSuccess(messages) {
  return {type: EXPORT_SUCCESS, messages: Immutable.List(messages)}
}

export function exportError(errors) {
  return {type: EXPORT_ERROR, errors: Immutable.List(errors)}
}
