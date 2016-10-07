import Immutable from 'immutable'
import {IMPORTING_DATA, IMPORTED_DATA, IMPORT_ERROR} from '../actions/BackupActions'

const DefaultState = Immutable.Map({
  loaded: true
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case IMPORTING_DATA:
      return state.set('loaded', false)

    case IMPORTED_DATA:
      return state.withMutations((map) =>
        map.set('infos', action.messages).delete('errors').set('loaded', true))

    case IMPORT_ERROR:
      return state.withMutations((map) =>
        map.delete('infos').set('errors', action.errors).set('loaded', true))

    default:
      return state
  }
}
