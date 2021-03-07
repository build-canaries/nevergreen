import {Actions} from '../../Actions'
import remove from 'lodash/remove'
import uniq from 'lodash/uniq'
import {ActionMessageAdded, ActionMessageRemoved} from './SuccessActionCreators'
import {createReducer} from '@reduxjs/toolkit'
import {State} from '../../Reducer'
import {ActionConfigurationImported} from '../backup/BackupActionCreators'

export type SuccessState = ReadonlyArray<string>

export const SUCCESS_ROOT = 'success'

const DEFAULT_STATE: SuccessState = ['=(^.^)=']

export const reduce = createReducer<SuccessState>(DEFAULT_STATE, {
  [Actions.CONFIGURATION_IMPORTED]: (draft, action: ActionConfigurationImported) => {
    if (action.configuration[SUCCESS_ROOT]) {
      return uniq(action.configuration[SUCCESS_ROOT]) as SuccessState
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

export function getSuccessMessages(state: State): ReadonlyArray<string> {
  return state[SUCCESS_ROOT]
}
