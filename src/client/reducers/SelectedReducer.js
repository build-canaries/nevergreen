import Immutable from 'immutable'
import {TRAY_ADDED, REMOVE_TRAY, PROJECTS_FETCHED} from '../actions/TrackingActions'
import {SELECT_PROJECT} from '../actions/TrayActions'
import {INITIALISED} from '../actions/NevergreenActions'

const DefaultState = Immutable.Map()

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
      return state.merge(action.data.get('selected')).map((included) => included.toSet())

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

    default:
      return state
  }
}
