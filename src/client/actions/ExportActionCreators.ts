import {Actions} from './Actions'
import {Action} from 'redux'

export interface ActionExporting extends Action<Actions.EXPORTING> {
}

export interface ActionExportSuccess extends Action<Actions.EXPORT_SUCCESS> {
  readonly messages: string[];
}

export interface ActionExportErrors extends Action<Actions.EXPORT_ERROR> {
  readonly errors: string[];
}

export function exporting(): ActionExporting {
  return {type: Actions.EXPORTING}
}

export function exportSuccess(messages: string[]): ActionExportSuccess {
  return {type: Actions.EXPORT_SUCCESS, messages}
}

export function exportError(errors: string[]): ActionExportErrors {
  return {type: Actions.EXPORT_ERROR, errors}
}
