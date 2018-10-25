import {Map} from 'immutable'
import {GITHUB_SET_DESCRIPTION, GITHUB_SET_GIST_ID, IMPORT_SUCCESS, INITIALISED} from '../actions/Actions'

export const GITHUB_ROOT = 'github'

const DEFAULT_STATE = Map({
  gistId: '',
  description: 'Nevergreen configuration backup'
})

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISED:
      return state.merge(action.data.get(GITHUB_ROOT))

    case IMPORT_SUCCESS:
      return state.set('description', action.data.getIn([GITHUB_ROOT, 'description'], state.get('description')))

    case GITHUB_SET_DESCRIPTION:
      return state.set('description', action.description)

    case GITHUB_SET_GIST_ID:
      return state.set('gistId', action.gistId)

    default:
      return state
  }
}
