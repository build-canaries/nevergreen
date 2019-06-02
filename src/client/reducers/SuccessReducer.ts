import {Actions} from '../actions/Actions'
import {remove, uniq} from 'lodash'
import {ActionInitalised} from '../actions/NevergreenActionCreators'
import {ActionImportSuccess} from '../actions/ImportActionCreators'
import {ActionMessageAdded, ActionMessageRemoved} from '../actions/SuccessActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {Draft} from 'immer'
import {State} from './Reducer'

export type SuccessState = string[]

export const SUCCESS_ROOT = 'success'

const DEFAULT_STATE: SuccessState = ['=(^.^)=']

function setConfiguration(draft: Draft<SuccessState>, action: ActionInitalised | ActionImportSuccess) {
  if (action.data[SUCCESS_ROOT]) {
    return uniq(action.data[SUCCESS_ROOT]) as Draft<SuccessState>
  }
  return draft
}

export const reduce = createReducer<SuccessState>(DEFAULT_STATE, {
  [Actions.INITIALISED]: setConfiguration,
  [Actions.IMPORT_SUCCESS]: setConfiguration,
  [Actions.MESSAGE_ADDED]: (draft, action: ActionMessageAdded) => {
    return uniq(draft.concat(action.message))
  },
  [Actions.MESSAGE_REMOVED]: (draft, action: ActionMessageRemoved) => {
    remove(draft, (message) => message === action.message)
  }
})

export const getSuccessMessages = createSelector<State, string[]>([SUCCESS_ROOT])
