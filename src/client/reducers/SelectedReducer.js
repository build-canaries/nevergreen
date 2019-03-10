import {Map, Set} from 'immutable'
import {
  IMPORT_SUCCESS,
  INITIALISED,
  PROJECTS_FETCHED,
  REMOVE_TRAY,
  SELECT_PROJECT,
  TRAY_ADDED
} from '../actions/Actions'

export const SELECTED_ROOT = 'selected'

const DEFAULT_STATE = Map()

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORT_SUCCESS: {
      const selected = action.data.get(SELECTED_ROOT)
      return selected ? Map(selected).map((included) => included.toSet()) : state
    }

    case TRAY_ADDED:
      return state.set(action.trayId, Set())

    case REMOVE_TRAY:
      return state.delete(action.trayId)

    case SELECT_PROJECT:
      return state.update(action.trayId, (includedProjectIds) =>
        action.selected
          ? includedProjectIds.add(action.projectId)
          : includedProjectIds.delete(action.projectId))

    case PROJECTS_FETCHED: {
      const fetchedProjectIds = action.data
        .map((project) => project.get('projectId'))

      const newProjectIds = action.data
        .filter((project) => project.get('isNew'))
        .map((project) => project.get('projectId'))

      return state.update(action.trayId, (includedProjectIds) => {
        return includedProjectIds
          .filter((projectId) => fetchedProjectIds.includes(projectId))
          .update((ids) => action.includeNew ? ids.union(newProjectIds) : ids)
      })
    }

    default:
      return state
  }
}
