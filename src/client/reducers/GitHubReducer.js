import Immutable from 'immutable'
import {GITHUB_SET_DESCRIPTION, GITHUB_SET_URL} from '../actions/GitHubActions'

const DefaultState = Immutable.Map({
  url: '',
  description: 'Nevergreen configuration backup =(^.^)='
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case GITHUB_SET_DESCRIPTION:
      return state.set('description', action.description)

    case GITHUB_SET_URL:
      return state.set('url', action.url)

    default:
      return state
  }
}
