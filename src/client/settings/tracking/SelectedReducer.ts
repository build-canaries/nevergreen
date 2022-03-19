import {Actions} from '../../Actions'
import {ActionProjectsFetched, ActionRemoveFeed, ActionSelectProject, ActionFeedAdded} from './TrackingActionCreators'
import {createReducer, createSelector} from '@reduxjs/toolkit'
import remove from 'lodash/remove'
import {State} from '../../Reducer'
import {ActionConfigurationImported} from '../backup/BackupActionCreators'

export interface SelectedState {
  readonly [trayId: string]: ReadonlyArray<string>;
}

export const SELECTED_ROOT = 'selected'

const defaultState: SelectedState = {}

export const reduce = createReducer<SelectedState>(defaultState, {
  [Actions.CONFIGURATION_IMPORTED]: (draft, action: ActionConfigurationImported) => {
    return action.configuration[SELECTED_ROOT]
      ? action.configuration[SELECTED_ROOT] as SelectedState
      : draft
  },
  [Actions.FEED_ADDED]: (draft, action: ActionFeedAdded) => {
    draft[action.trayId] = []
  },
  [Actions.FEED_REMOVED]: (draft, action: ActionRemoveFeed) => {
    delete draft[action.trayId]
  },
  [Actions.PROJECT_SELECTED]: (draft, action: ActionSelectProject) => {
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

export function getSelectedProjects(state: State): SelectedState {
  return state[SELECTED_ROOT]
}

export function getSelectedProjectsForFeed(trayId: string): (state: State) => ReadonlyArray<string> {
  return createSelector(getSelectedProjects, (selected) => selected[trayId])
}
