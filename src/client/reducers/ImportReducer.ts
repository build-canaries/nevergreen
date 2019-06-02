import {Actions} from '../actions/Actions'
import {ActionImportErrors, ActionImportSuccess} from '../actions/ImportActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {State} from './Reducer'

export interface ImportState {
  readonly loaded: boolean;
  readonly infos: string[];
  readonly errors: string[];
}

export const IMPORT_ROOT = 'backupImport'

const DEFAULT_STATE: ImportState = {
  loaded: true,
  infos: [],
  errors: []
}

export const reduce = createReducer<ImportState>(DEFAULT_STATE, {
  [Actions.IMPORTING]: (draft) => {
    draft.loaded = false
    draft.infos = []
    draft.errors = []
  },
  [Actions.IMPORT_SUCCESS]: (draft, action: ActionImportSuccess) => {
    draft.loaded = true
    draft.infos = action.messages
    draft.errors = []
  },
  [Actions.IMPORT_ERROR]: (draft, action: ActionImportErrors) => {
    draft.loaded = true
    draft.infos = []
    draft.errors = action.errors
  },
  [Actions.NAVIGATED]: (draft) => {
    draft.infos = []
    draft.errors = []
  }
})

export const getImportLoaded = createSelector<State, boolean>([[IMPORT_ROOT, 'loaded']])
export const getImportErrors = createSelector<State, string[]>([[IMPORT_ROOT, 'errors']])
export const getImportInfos = createSelector<State, string[]>([[IMPORT_ROOT, 'infos']])
