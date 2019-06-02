import {Actions} from '../actions/Actions'
import {ActionImportSuccess} from '../actions/ImportActionCreators'
import {
  ActionProjectsFetched,
  ActionRemoveTray,
  ActionSelectProject,
  ActionTrayAdded
} from '../actions/TrackingActionCreators'
import {createReducer} from 'redux-starter-kit'
import {ActionInitalised} from '../actions/NevergreenActionCreators'
import {get, remove} from 'lodash'
import {State} from './Reducer'

export interface SelectedState {
  readonly [trayId: string]: string[];
}

export const SELECTED_ROOT = 'selected'

const DEFAULT_STATE: SelectedState = {}

export const reduce = createReducer<SelectedState>(DEFAULT_STATE, {
  [Actions.INITIALISED]: (draft, action: ActionInitalised) => {
    return action.data[SELECTED_ROOT]
      ? action.data[SELECTED_ROOT] as SelectedState
      : draft
  },
  [Actions.IMPORT_SUCCESS]: (draft, action: ActionImportSuccess) => {
    return action.data[SELECTED_ROOT]
      ? action.data[SELECTED_ROOT] as SelectedState
      : draft
  },
  [Actions.TRAY_ADDED]: (draft, action: ActionTrayAdded) => {
    draft[action.trayId] = []
  },
  [Actions.REMOVE_TRAY]: (draft, action: ActionRemoveTray) => {
    delete draft[action.trayId]
  },
  [Actions.SELECT_PROJECT]: (draft, action: ActionSelectProject) => {
    action.selected
      ? draft[action.trayId].push(action.projectId)
      : remove(draft[action.trayId], (id) => id === action.projectId)
  },
  [Actions.PROJECTS_FETCHED]: (draft, action: ActionProjectsFetched) => {
    const fetchedProjectIds = action.data
      .map((project) => project.projectId)

    const newProjectIds = action.data
      .filter((project) => project.isNew)
      .map((project) => project.projectId)

    const unselectNotFetched: string[] = draft[action.trayId]
      .filter((projectId) => fetchedProjectIds.includes(projectId))

    draft[action.trayId] = action.includeNew
      ? unselectNotFetched.concat(newProjectIds)
      : unselectNotFetched
  }
})

export function getSelectedProjects(state: State): SelectedState
export function getSelectedProjects(state: State, trayId: string): string[]
export function getSelectedProjects(state: State, trayId?: string): string[] | SelectedState {
  return trayId
    ? get(state, [SELECTED_ROOT, trayId])
    : get(state, SELECTED_ROOT)
}
