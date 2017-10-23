import Immutable from 'immutable'
import {SELECT_PROJECT} from '../actions/Actions'
import {INITIALISED, PROJECTS_FETCHED, REMOVE_TRAY, SET_TRAY_ID, TRAY_ADDED} from '../actions/Actions'
import {IMPORT_SUCCESS} from '../actions/Actions'

const DefaultState = Immutable.Map()

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORT_SUCCESS: {
      const selected = action.data.get('selected')
      return selected ? Immutable.Map(selected).map((included) => included.toSet()) : state
    }

    case TRAY_ADDED:
      return state.set(action.trayId, Immutable.Set())

    case REMOVE_TRAY:
      return state.delete(action.trayId)

    case SELECT_PROJECT:
      return state.update(action.trayId, (included) =>
        action.selected ? included.add(action.projectId) : included.delete(action.projectId))

    case PROJECTS_FETCHED: {
      const currentUrls = action.data.map((project) => project.get('projectId'))
      return state.update(action.trayId, (included) => included.filter((projectId) => currentUrls.includes(projectId)))
    }

    case SET_TRAY_ID:
      return state.mapKeys((key) => key === action.originalTrayId ? action.newTrayId : key)

    default:
      return state
  }
}
