import Immutable from 'immutable'
import {
  IMPORT_SUCCESS,
  INITIALISED,
  PROJECTS_FETCHED,
  REMOVE_TRAY,
  SELECT_PROJECT,
  SET_TRAY_ID,
  TRAY_ADDED
} from '../actions/Actions'

const DEFAULT_STATE = Immutable.Map()

export function reduce(state = DEFAULT_STATE, action) {
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
      return state.update(action.trayId, (includedProjectIds) =>
        action.selected
          ? includedProjectIds.add(action.projectId)
          : includedProjectIds.delete(action.projectId))

    case PROJECTS_FETCHED: {
      const currentProjectIds = action.data.map((project) => project.get('projectId'))

      return state.update(action.trayId, (includedProjectIds) => {
        const updated = action.selectAll
          ? includedProjectIds.union(currentProjectIds)
          : includedProjectIds
        return updated.filter((projectId) => currentProjectIds.includes(projectId))
      })
    }

    case SET_TRAY_ID:
      return state.mapKeys((trayId) =>
        trayId === action.originalTrayId
          ? action.newTrayId
          : trayId)

    default:
      return state
  }
}
