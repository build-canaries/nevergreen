import {Map} from 'immutable'
import {BACKUP_SET_DESCRIPTION, BACKUP_SET_ID, BACKUP_SET_URL, INITIALISED} from '../actions/Actions'

export const BACKUP_ROOT = 'backup'

const DEFAULT_STATE = Map({
  github: {
    id: '',
    description: 'Nevergreen configuration backup',
    url: 'https://api.github.com'
  },
  gitlab: {
    url: 'https://gitlab.com',
    description: 'Nevergreen configuration backup',
    id: ''
  }
})

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISED:
      return state.merge(action.data.get(BACKUP_ROOT))

    case BACKUP_SET_DESCRIPTION:
      return state.setIn([action.location, 'description'], action.description)

    case BACKUP_SET_ID:
      return state.setIn([action.location, 'id'], action.id)

    case BACKUP_SET_URL:
      return state.setIn([action.location, 'url'], action.url)

    default:
      return state
  }
}
