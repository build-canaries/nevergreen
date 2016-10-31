import Immutable from 'immutable'
import {TRAY_ADDED, REMOVE_TRAY, PROJECTS_FETCHED, SELECT_PROJECT} from '../actions/TrackingActions'
import {INITIALISED} from '../actions/NevergreenActions'
import {IMPORTED_DATA} from '../actions/BackupActions'

const DefaultState = Immutable.Map()

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORTED_DATA: {
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

    default:
      return state
  }
}
