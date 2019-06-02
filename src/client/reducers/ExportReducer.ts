import {Actions} from '../actions/Actions'
import {createReducer, createSelector} from 'redux-starter-kit'
import {ActionImportErrors} from '../actions/ImportActionCreators'
import {ActionExportSuccess} from '../actions/ExportActionCreators'
import {State} from './Reducer'

export interface ExportState {
  readonly loaded: boolean;
  readonly infos: string[];
  readonly errors: string[];
}

export const EXPORT_ROOT = 'backupExport'

const DEFAULT_STATE: ExportState = {
  loaded: true,
  infos: [],
  errors: []
}

export const reduce = createReducer<ExportState>(DEFAULT_STATE, {
  [Actions.EXPORTING]: (draft) => {
    draft.loaded = false
    draft.infos = []
    draft.errors = []
  },
  [Actions.EXPORT_SUCCESS]: (draft, action: ActionExportSuccess) => {
    draft.loaded = true
    draft.infos = action.messages
    draft.errors = []
  },
  [Actions.EXPORT_ERROR]: (draft, action: ActionImportErrors) => {
    draft.loaded = true
    draft.infos = []
    draft.errors = action.errors
  },
  [Actions.NAVIGATED]: (draft) => {
    draft.infos = []
    draft.errors = []
  }
})

export const getExportLoaded = createSelector<State, boolean>([[EXPORT_ROOT, 'loaded']])
export const getExportErrors = createSelector<State, string[]>([[EXPORT_ROOT, 'errors']])
export const getExportInfos = createSelector<State, string[]>([[EXPORT_ROOT, 'infos']])
