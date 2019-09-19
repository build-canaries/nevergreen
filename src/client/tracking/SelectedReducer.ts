import {Actions} from '../Actions'
import {ActionProjectsFetched, ActionRemoveTray, ActionSelectProject, ActionTrayAdded} from './TrackingActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {ActionSetConfiguration} from '../NevergreenActionCreators'
import {remove} from 'lodash'
import {State} from '../Reducer'

export interface SelectedState {
  readonly [trayId: string]: ReadonlyArray<string>;
}

export const SELECTED_ROOT = 'selected'

const DEFAULT_STATE: SelectedState = {}

export const reduce = createReducer<SelectedState>(DEFAULT_STATE, {
  [Actions.SET_CONFIGURATION]: (draft, action: ActionSetConfiguration) => {
    return action.configuration[SELECTED_ROOT]
      ? action.configuration[SELECTED_ROOT] as SelectedState
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

export const getSelectedProjects = (state: State) => state[SELECTED_ROOT]
export const getSelectedProjectsForTray = (trayId: string) => createSelector(getSelectedProjects, (selected) => selected[trayId])
