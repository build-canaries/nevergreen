import {Actions} from '../actions/Actions'
import {filter, uniq} from 'lodash'
import {ActionInitalised} from '../actions/NevergreenActionCreators'
import {ActionImportSuccess} from '../actions/ImportActionCreators'
import {ActionMessageAdded, ActionMessageRemoved} from '../actions/SuccessActionCreators'

export type SuccessState = string[]

type SupportedActions = ActionInitalised | ActionImportSuccess | ActionMessageAdded | ActionMessageRemoved

export const SUCCESS_ROOT = 'success'

const DEFAULT_STATE: SuccessState = ['=(^.^)=']

export function reduce(state = DEFAULT_STATE, action: SupportedActions): SuccessState {
  switch (action.type) {
    case Actions.INITIALISED:
    case Actions.IMPORT_SUCCESS:
      return action.data[SUCCESS_ROOT]
        ? uniq(action.data[SUCCESS_ROOT]) as string[]
        : state

    case Actions.MESSAGE_ADDED:
      return uniq([...state, action.message])

    case Actions.MESSAGE_REMOVED:
      return filter(state, (message) => message !== action.message)

    default:
      return state
  }
}
