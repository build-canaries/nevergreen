import {Actions} from '../Actions'
import {
  ActionExcludeAllProject,
  ActionProjectsFetched,
  ActionRemoveTray,
  ActionSelectProject,
  ActionTrayAdded
} from './TrackingActionCreators'
import {createReducer, createSelector} from '@reduxjs/toolkit'
import {remove} from 'lodash'
import {State} from '../Reducer'
import {ActionConfigurationImported} from '../backup/BackupActionCreators'

export interface SelectedState {
  readonly [trayId: string]: ReadonlyArray<string>;
}

export const SELECTED_ROOT = 'selected'

const DEFAULT_STATE: SelectedState = {}

export const reduce = createReducer<SelectedState>(DEFAULT_STATE, {
  [Actions.CONFIGURATION_IMPORTED]: (draft, action: ActionConfigurationImported) => {
    return action.configuration[SELECTED_ROOT]
      ? action.configuration[SELECTED_ROOT] as SelectedState
      : draft
  },
  [Actions.TRAY_ADDED]: (draft, action: ActionTrayAdded) => {
    draft[action.trayId] = []
  },
  [Actions.TRAY_REMOVED]: (draft, action: ActionRemoveTray) => {
    delete draft[action.trayId]
  },
  [Actions.PROJECT_SELECTED]: (draft, action: ActionSelectProject) => {
    action.selected
      ? draft[action.trayId].push(action.projectId)
      : remove(draft[action.trayId], (id) => id === action.projectId)
  },
  [Actions.ALL_PROJECT_SELECTED]: (draft, action: ActionExcludeAllProject) => {
    action.selected
      ? draft[action.trayId].push(...action.projectIds)
      : remove(draft[action.trayId], (id) => action.projectIds.includes(id))
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

export function getSelectedProjects(state: State): SelectedState {
  return state[SELECTED_ROOT]
}

export function getSelectedProjectsForTray(trayId: string): (state: State) => ReadonlyArray<string> {
  return createSelector(getSelectedProjects, (selected) => selected[trayId])
}
