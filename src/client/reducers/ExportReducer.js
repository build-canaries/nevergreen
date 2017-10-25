import Immutable from 'immutable'
import {EXPORT_ERROR, EXPORT_SUCCESS, EXPORTING, NAVIGATED} from '../actions/Actions'

const DefaultState = Immutable.Map({
  loaded: true
})

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

    case NAVIGATED:
      return state.withMutations((map) =>
        map.delete('infos').delete('errors'))

    default:
      return state
  }
}
