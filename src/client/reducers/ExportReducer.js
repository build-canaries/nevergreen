import Immutable from 'immutable'
import {EXPORT_ERROR, EXPORT_SUCCESS, EXPORTING} from '../actions/ExportActions'

const DefaultState = Immutable.Map()

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case EXPORTING:
      return state.withMutations((map) =>
        map.set('loaded', false).delete('infos').delete('errors'))

    case EXPORT_SUCCESS:
      return state.withMutations((map) =>
        map.set('loaded', true).set('infos', action.messages).delete('errors'))

    case EXPORT_ERROR:
      return state.withMutations((map) =>
        map.set('loaded', true).delete('infos').set('errors', action.errors))

    default:
      return state
  }
}
