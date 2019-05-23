import {Actions} from '../actions/Actions'
import {ActionNavigated} from '../actions/NevergreenActionCreators'
import {ActionImportErrors, ActionImporting, ActionImportSuccess} from '../actions/ImportActionCreators'

export interface ImportState {
  readonly loaded: boolean;
  readonly infos: string[];
  readonly errors: string[];
}

type SupportedActions = ActionImporting | ActionImportSuccess | ActionImportErrors | ActionNavigated

export const IMPORT_ROOT = 'backupImport'

const DEFAULT_STATE: ImportState = {
  loaded: true,
  infos: [],
  errors: []
}

export function reduce(state = DEFAULT_STATE, action: SupportedActions): ImportState {
  switch (action.type) {
    case Actions.IMPORTING:
      return {
        loaded: false,
        infos: [],
        errors: []
      }

    case Actions.IMPORT_SUCCESS:
      return {
        loaded: true,
        infos: action.messages,
        errors: []
      }

    case Actions.IMPORT_ERROR:
      return {
        loaded: true,
        infos: [],
        errors: action.errors
      }

    case Actions.NAVIGATED:
      return {
        ...state,
        infos: [],
        errors: []
      }

    default:
      return state
  }
}
