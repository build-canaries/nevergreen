import {Actions} from '../actions/Actions'
import {remove, uniq} from 'lodash'
import {ActionSetConfiguration} from '../actions/NevergreenActionCreators'
import {ActionMessageAdded, ActionMessageRemoved} from '../actions/SuccessActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {Draft} from 'immer'
import {State} from './Reducer'

export type SuccessState = string[]

export const SUCCESS_ROOT = 'success'

const DEFAULT_STATE: SuccessState = ['=(^.^)=']

export const reduce = createReducer<SuccessState>(DEFAULT_STATE, {
  [Actions.SET_CONFIGURATION]: (draft: Draft<SuccessState>, action: ActionSetConfiguration) => {
    if (action.configuration[SUCCESS_ROOT]) {
      return uniq(action.configuration[SUCCESS_ROOT]) as Draft<SuccessState>
    }
    return draft
  },
  [Actions.MESSAGE_ADDED]: (draft, action: ActionMessageAdded) => {
    return uniq(draft.concat(action.message))
  },
  [Actions.MESSAGE_REMOVED]: (draft, action: ActionMessageRemoved) => {
    remove(draft, (message) => message === action.message)
  }
})

export const getSuccessMessages = createSelector<State, string[]>([SUCCESS_ROOT])
