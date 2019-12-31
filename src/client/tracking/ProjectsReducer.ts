import {Actions} from '../Actions'
import {Project} from '../domain/Project'
import {unionWith} from 'lodash'
import {ActionProjectsFetched, ActionRemoveTray, ActionTrayAdded} from './TrackingActionCreators'
import {createReducer, createSelector} from '@reduxjs/toolkit'
import {State} from '../Reducer'
import {ActionConfigurationImported} from '../backup/BackupActionCreators'

export interface ProjectsState {
  readonly [trayId: string]: ReadonlyArray<Project>;
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
    const existingProjects = draft[action.trayId]

    draft[action.trayId] = unionWith(
      action.data,
      existingProjects
        .filter((project) => !project.removed)
        .map((project) => ({...project, removed: true, isNew: false})),
      (fetched, existing) => fetched.projectId === existing.projectId)
  }
})

const getProjects = (state: State) => state[PROJECTS_ROOT]
export const getProjectsForTray = (trayId: string) => createSelector(getProjects, (projects) => projects[trayId])
export const getProjectsAll = createSelector(getProjects, (projects) => {
  return Object.values(projects).flatMap((projectsPerTray) => projectsPerTray)
})
