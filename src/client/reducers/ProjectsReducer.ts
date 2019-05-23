import {Actions} from '../actions/Actions'
import {Project} from '../domain/Project'
import {merge, omit} from 'lodash'
import {ActionInitalised} from '../actions/NevergreenActionCreators'
import {ActionImportSuccess} from '../actions/ImportActionCreators'
import {ActionProjectsFetched, ActionRemoveTray, ActionTrayAdded} from '../actions/TrackingActionCreators'

interface ProjectByIdState {
  [projectId: string]: Project;
}

export interface ProjectsState {
  readonly [trayId: string]: ProjectByIdState;
}

type SupportedActions = ActionInitalised
  | ActionImportSuccess
  | ActionTrayAdded
  | ActionRemoveTray
  | ActionProjectsFetched

function byProjectId(acc: ProjectByIdState, current: Project) {
  acc[current.projectId] = current
  return acc
}

export const PROJECTS_ROOT = 'projects'

const DEFAULT_STATE: ProjectsState = {}

export function reduce(state = DEFAULT_STATE, action: SupportedActions): ProjectsState {
  switch (action.type) {
    case Actions.INITIALISED:
    case Actions.IMPORT_SUCCESS:
      return action.data[PROJECTS_ROOT]
        ? action.data[PROJECTS_ROOT] as ProjectsState
        : state

    case Actions.TRAY_ADDED:
      return {...state, [action.trayId]: {}}

    case Actions.REMOVE_TRAY:
      return omit(state, action.trayId)

    case Actions.PROJECTS_FETCHED: {
      const fetched = action.data.reduce(byProjectId, {})

      const projects = merge(Object.values(state[action.trayId])
          .filter((project) => !project.removed)
          .map((project) => ({...project, removed: true}))
          .reduce(byProjectId, {}),
        fetched)

      return {...state, [action.trayId]: projects}
    }

    default:
      return state
  }
}
