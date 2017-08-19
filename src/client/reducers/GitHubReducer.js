import Immutable from 'immutable'
import {GITHUB_SET_DESCRIPTION, GITHUB_SET_GIST_ID} from '../actions/GitHubActions'
import {INITIALISED} from '../actions/NevergreenActions'
import {IMPORT_SUCCESS} from '../actions/ImportActions'

const DefaultState = Immutable.Map({
  gistId: '',
  description: 'Nevergreen configuration backup'
})

export function reduce(state = DefaultState, action) {
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
