import {Actions} from '../Actions'
import {Project} from '../domain/Project'
import {merge} from 'lodash'
import {ActionProjectsFetched, ActionRemoveTray, ActionTrayAdded} from './TrackingActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {ActionSetConfiguration} from '../NevergreenActionCreators'
import {State} from '../Reducer'

interface ProjectByIdState {
  [projectId: string]: Project;
}

export interface ProjectsState {
  readonly [trayId: string]: ProjectByIdState;
}

function byProjectId(acc: ProjectByIdState, current: Project) {
  acc[current.projectId] = current
  return acc
}

export const PROJECTS_ROOT = 'projects'

const DEFAULT_STATE: ProjectsState = {}

export const reduce = createReducer<ProjectsState>(DEFAULT_STATE, {
  [Actions.SET_CONFIGURATION]: (draft, action: ActionSetConfiguration) => {
    return action.configuration[PROJECTS_ROOT]
      ? action.configuration[PROJECTS_ROOT] as ProjectsState
      : draft
  },
  [Actions.TRAY_ADDED]: (draft, action: ActionTrayAdded) => {
    draft[action.trayId] = {}
  },
  [Actions.TRAY_REMOVED]: (draft, action: ActionRemoveTray) => {
    delete draft[action.trayId]
  },
  [Actions.PROJECTS_FETCHED]: (draft, action: ActionProjectsFetched) => {
    const fetched = action.data.reduce(byProjectId, {})

    draft[action.trayId] = merge(Object.values(draft[action.trayId])
        .filter((project) => !project.removed)
        .map((project) => ({...project, removed: true, isNew: false}))
        .reduce(byProjectId, {}),
      fetched)
  }
})

const getProjects = (state: State) => state[PROJECTS_ROOT]
export const getProjectsForTray = (trayId: string) => createSelector(getProjects, (projects) => {
  return Object.values(projects[trayId] || {})
})
export const getProjectsAll = createSelector(getProjects, (projects) => {
  return Object.values(projects).flatMap((projectsById) => Object.values(projectsById))
})
