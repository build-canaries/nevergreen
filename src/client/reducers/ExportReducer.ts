import {Actions} from '../actions/Actions'
import {ActionExportErrors, ActionExporting, ActionExportSuccess} from '../actions/ExportActionCreators'
import {ActionNavigated} from '../actions/NevergreenActionCreators'

export interface ExportState {
  readonly loaded: boolean;
  readonly infos: string[];
  readonly errors: string[];
}

type SupportedActions = ActionExporting | ActionExportSuccess | ActionExportErrors | ActionNavigated

export const EXPORT_ROOT = 'backupExport'

const DEFAULT_STATE: ExportState = {
  loaded: true,
  infos: [],
  errors: []
}

export function reduce(state = DEFAULT_STATE, action: SupportedActions): ExportState {
  switch (action.type) {
    case Actions.EXPORTING:
      return {
        loaded: false,
        infos: [],
        errors: []
      }

    case Actions.EXPORT_SUCCESS:
      return {
        loaded: true,
        infos: action.messages,
        errors: []
      }

    case Actions.EXPORT_ERROR:
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
