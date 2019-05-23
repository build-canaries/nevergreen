import {Actions} from './Actions'
import {Action} from 'redux'
import {Configuration} from '../reducers/Configuration'

export interface ActionImporting extends Action<Actions.IMPORTING> {
}

export interface ActionImportErrors extends Action<Actions.IMPORT_ERROR> {
  readonly errors: string[];
}

export interface ActionImportSuccess extends Action<Actions.IMPORT_SUCCESS> {
  readonly messages: string[];
  readonly data: Configuration;
}

export function importing(): ActionImporting {
  return {type: Actions.IMPORTING}
}

export function importError(errors: string[]): ActionImportErrors {
  return {type: Actions.IMPORT_ERROR, errors}
}

export function importSuccess(configuration: Configuration): ActionImportSuccess {
  return {
    type: Actions.IMPORT_SUCCESS,
    data: configuration,
    messages: ['Successfully imported']
  }
}
