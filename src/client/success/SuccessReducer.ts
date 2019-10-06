import {Actions} from '../Actions'
import {remove, uniq} from 'lodash'
import {ActionMessageAdded, ActionMessageRemoved} from './SuccessActionCreators'
import {createReducer} from 'redux-starter-kit'
import {State} from '../Reducer'
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

export const getSuccessMessages = (state: State) => state[SUCCESS_ROOT]
