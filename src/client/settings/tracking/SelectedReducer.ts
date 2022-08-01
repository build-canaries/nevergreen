import {Actions} from '../../Actions'
import {ActionFeedUpdate, ActionRemoveFeed, ActionSelectProject} from './TrackingActionCreators'
import {createReducer, createSelector} from '@reduxjs/toolkit'
import remove from 'lodash/remove'
import {State} from '../../Reducer'
import {ActionConfigurationImported} from '../backup/BackupActionCreators'
import {TrackingMode} from '../../domain/Feed'

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
  [Actions.FEED_UPDATED]: (draft, action: ActionFeedUpdate) => {
    if (action.data.trackingMode === TrackingMode.selected) {
      draft[action.trayId] = []
    } else {
      delete draft[action.trayId]
    }
  },
  [Actions.FEED_REMOVED]: (draft, action: ActionRemoveFeed) => {
    delete draft[action.trayId]
  },
  [Actions.PROJECT_SELECTED]: (draft, action: ActionSelectProject) => {
    action.selected
      ? draft[action.trayId].push(action.projectId)
      : remove(draft[action.trayId], (id) => id === action.projectId)
  }
})

export function getSelectedProjects(state: State): SelectedState {
  return state[SELECTED_ROOT]
}

export function getSelectedProjectsForFeed(trayId: string): (state: State) => ReadonlyArray<string> {
  return createSelector(getSelectedProjects, (selected) => selected[trayId])
}
