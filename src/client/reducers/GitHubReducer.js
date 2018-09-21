import {fromJS} from 'immutable'
import {GITHUB_SET_DESCRIPTION, GITHUB_SET_GIST_ID, IMPORT_SUCCESS, INITIALISED} from '../actions/Actions'

const DEFAULT_STATE = fromJS({
  gistId: '',
  description: 'Nevergreen configuration backup'
})

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISED:
      return state.merge(action.data.get('github'))

    case IMPORT_SUCCESS:
      return state.set('description', action.data.getIn(['github', 'description'], state.get('description')))

    case GITHUB_SET_DESCRIPTION:
      return state.set('description', action.description)

    case GITHUB_SET_GIST_ID:
      return state.set('gistId', action.gistId)

    default:
      return state
  }
}
