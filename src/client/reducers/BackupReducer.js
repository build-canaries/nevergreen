import Immutable from 'immutable'
import {IMPORTED_DATA, IMPORT_ERROR} from '../actions/BackupActions'

const DefaultState = Immutable.Map()

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case IMPORTED_DATA:
      return state.withMutations((map) =>
        map.set('infos', action.messages).delete('errors'))

    case IMPORT_ERROR:
      return state.withMutations((map) =>
        map.delete('infos').set('errors', action.errors))

    default:
      return state
  }
}
