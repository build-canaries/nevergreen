import {Actions} from '../actions/Actions'
import {filter, omit} from 'lodash'
import {ActionInitalised} from '../actions/NevergreenActionCreators'
import {ActionImportSuccess} from '../actions/ImportActionCreators'
import {
  ActionProjectsFetched,
  ActionRemoveTray,
  ActionSelectProject,
  ActionTrayAdded
} from '../actions/TrackingActionCreators'

export interface SelectedState {
  readonly [trayId: string]: string[];
}

type SupportedActions = ActionInitalised
  | ActionImportSuccess
  | ActionTrayAdded
  | ActionRemoveTray
  | ActionSelectProject
  | ActionProjectsFetched

export const SELECTED_ROOT = 'selected'

const DEFAULT_STATE: SelectedState = {}

export function reduce(state = DEFAULT_STATE, action: SupportedActions): SelectedState {
  switch (action.type) {
    case Actions.INITIALISED:
    case Actions.IMPORT_SUCCESS:
      return action.data[SELECTED_ROOT]
        ? action.data[SELECTED_ROOT] as SelectedState
        : state

    case Actions.TRAY_ADDED:
      return {...state, [action.trayId]: []}

    case Actions.REMOVE_TRAY:
      return omit(state, action.trayId)

    case Actions.SELECT_PROJECT:
      return {
        ...state,
        [action.trayId]: action.selected
          ? state[action.trayId].concat(action.projectId)
          : filter(state[action.trayId], (id) => id !== action.projectId)
      }

    case Actions.PROJECTS_FETCHED: {
      const fetchedProjectIds = action.data
        .map((project) => project.projectId)

      const newProjectIds = action.data
        .filter((project) => project.isNew)
        .map((project) => project.projectId)

      const unselectNotFetched = state[action.trayId]
        .filter((projectId) => fetchedProjectIds.includes(projectId))

      const selectedProjects = action.includeNew
        ? unselectNotFetched.concat(newProjectIds)
        : unselectNotFetched

      return {
        ...state,
        [action.trayId]: selectedProjects
      }
    }

    default:
      return state
  }
}
