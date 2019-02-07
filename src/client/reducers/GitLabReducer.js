import {Map} from 'immutable'
import {GITLAB_SET_SNIPPET_ID, GITLAB_SET_URL, INITIALISED} from '../actions/Actions'

export const GITLAB_ROOT = 'gitlab'

const DEFAULT_STATE = Map({
  url: 'https://gitlab.com',
  snippetId: ''
})

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISED:
      return state.merge(action.data.get(GITLAB_ROOT))

    case GITLAB_SET_URL:
      return state.set('url', action.url)

    case GITLAB_SET_SNIPPET_ID:
      return state.set('snippetId', action.snippetId)

    default:
      return state
  }
}
