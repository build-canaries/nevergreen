import {Actions} from '../Actions'
import unionWith from 'lodash/unionWith'
import pick from 'lodash/pick'
import {ActionProjectsFetched, ActionRemoveTray, ActionTrayAdded} from './TrackingActionCreators'
import {createReducer, createSelector} from '@reduxjs/toolkit'
import {State} from '../Reducer'
import {ActionConfigurationImported} from '../settings/backup/BackupActionCreators'

export interface ProjectState {
  readonly description: string;
  readonly isNew?: boolean;
  readonly projectId: string;
  readonly removed?: boolean;
  readonly trayId: string;
}

export interface ProjectsState {
  readonly [trayId: string]: ReadonlyArray<ProjectState>;
}

export const PROJECTS_ROOT = 'projects'

const DEFAULT_STATE: ProjectsState = {}

export const reduce = createReducer<ProjectsState>(DEFAULT_STATE, {
  [Actions.CONFIGURATION_IMPORTED]: (draft, action: ActionConfigurationImported) => {
    return action.configuration[PROJECTS_ROOT]
      ? action.configuration[PROJECTS_ROOT] as ProjectsState
      : draft
  },
  [Actions.TRAY_ADDED]: (draft, action: ActionTrayAdded) => {
    draft[action.trayId] = []
  },
  [Actions.TRAY_REMOVED]: (draft, action: ActionRemoveTray) => {
    delete draft[action.trayId]
  },
  [Actions.PROJECTS_FETCHED]: (draft, action: ActionProjectsFetched) => {
    const allExistingProjects = draft[action.trayId]
    const activeExistingProjects = allExistingProjects
      .filter((existing) => !existing.removed)
      .map((existing) => ({...existing, removed: true, isNew: false}))
    const fetchedProjects = action.data.map((fetched) => ({
      ...pick(fetched, ['description', 'isNew', 'projectId', 'trayId']),
      removed: false
    }))

    draft[action.trayId] = unionWith<ProjectState>(
      fetchedProjects,
      activeExistingProjects,
      (fetched, active) => fetched.projectId === active.projectId)
  }
})

function getProjects(state: State) {
  return state[PROJECTS_ROOT]
}

export function getProjectsForTray(trayId: string): (state: State) => ReadonlyArray<ProjectState> {
  return createSelector(getProjects, (projects) => projects[trayId])
}

export const getKnownProjects = createSelector(getProjects, (projects) => {
  return Object.values(projects).flatMap((projectsPerTray) => projectsPerTray)
})
