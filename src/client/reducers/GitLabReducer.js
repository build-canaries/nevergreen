import {Map} from 'immutable'
import {GITLAB_SET_TITLE, GITLAB_SET_SNIPPET_ID, GITLAB_SET_URL, IMPORT_SUCCESS, INITIALISED} from '../actions/Actions'

export const GITLAB_ROOT = 'gitlab'

const DEFAULT_STATE = Map({
  url: 'https://gitlab.com',
  snippetId: '',
  title: 'Nevergreen configuration backup'
})

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISED:
      return state.merge(action.data.get(GITLAB_ROOT))

    case IMPORT_SUCCESS:
      return state.set('title', action.data.getIn([GITLAB_ROOT, 'title'], state.get('title')))

    case GITLAB_SET_URL:
      return state.set('url', action.url)

    case GITLAB_SET_TITLE:
      return state.set('title', action.title)

    case GITLAB_SET_SNIPPET_ID:
      return state.set('snippetId', action.snippetId)

    default:
      return state
  }
}
