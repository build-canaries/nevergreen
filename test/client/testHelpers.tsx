import React, {ReactNode} from 'react'
import {merge} from 'lodash'
import {reducer, State} from '../../src/client/Reducer'
import {SETTINGS_ROOT} from '../../src/client/settings/SettingsReducer'
import {BACKUP_ROOT} from '../../src/client/backup/BackupReducer'
import {PROJECTS_ROOT, SavedProject} from '../../src/client/tracking/ProjectsReducer'
import {SELECTED_ROOT} from '../../src/client/tracking/SelectedReducer'
import {SUCCESS_ROOT} from '../../src/client/success/SuccessReducer'
import {TRAYS_ROOT} from '../../src/client/tracking/TraysReducer'
import {Prognosis, Project, ProjectError} from '../../src/client/domain/Project'
import {createTray, Tray} from '../../src/client/domain/Tray'
import {combineReducers, Reducer} from 'redux'
import {RecursivePartial} from '../../src/client/common/Types'
import {render as testRender} from '@testing-library/react'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import {MemoryRouter} from 'react-router-dom'
import Modal from 'react-modal'
import {DEFAULT_PROJECTS_TO_SHOW, DEFAULT_REFRESH_TIME} from '../../src/client/settings/SettingsActionCreators'
import {APPLIED_MIGRATIONS_ROOT} from '../../src/client/configuration/MigrationsReducer'

export function buildState(subState: RecursivePartial<State> = {}): State {
  return merge({
    [SETTINGS_ROOT]: {
      brokenBuildSoundFx: '',
      clickToShowMenu: false,
      maxProjectsToShow: DEFAULT_PROJECTS_TO_SHOW,
      playBrokenBuildSoundFx: false,
      refreshTime: DEFAULT_REFRESH_TIME,
      showBuildLabel: false,
      showBuildTime: false,
      showSystemNotifications: false,
      showTrayName: false,
      systemNotificationPermissionDenied: false,
      systemNotificationRequestingPermission: false,
      showPrognosis: []
    },
    [BACKUP_ROOT]: {
      github: {
        description: '',
        id: '',
        url: ''
      },
      gitlab: {
        description: '',
        id: '',
        url: ''
      }
    },
    [PROJECTS_ROOT]: {},
    [SELECTED_ROOT]: {},
    [SUCCESS_ROOT]: [],
    [TRAYS_ROOT]: {},
    [APPLIED_MIGRATIONS_ROOT]: []
  }, subState)
}

export function setupReactModal() {
  const appElement = document.createElement('div')
  appElement.setAttribute('id', 'app-element')
  document.body.append(appElement)
  Modal.setAppElement('#app-element')
}

export function render(component: ReactNode, state: RecursivePartial<State> = {}, location = '/') {
  const store = configureStore({reducer, preloadedState: buildState(state)})

  const wrapWithStoreAndRouter = (c: ReactNode) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[location]}>{c}</MemoryRouter>
    </Provider>
  )

  const fns = testRender(wrapWithStoreAndRouter(component))

  return {
    ...fns,
    rerender: (c: ReactNode) => fns.rerender(wrapWithStoreAndRouter(c)),
    store
  }
}

export function buildTray(tray: Partial<Tray> = {}): Tray {
  return createTray('some-tray-id', 'some-url', tray)
}

export function buildProject(project: Partial<Project> = {}): Project {
  const defaultProject: Project = {
    isNew: true,
    lastBuildLabel: '',
    description: 'some-name',
    prognosis: Prognosis.unknown,
    projectId: 'some-project-id',
    serverType: '',
    timestamp: '',
    trayId: '',
    webUrl: ''
  }
  return merge(defaultProject, project)
}

export function buildSavedProject(project: Partial<SavedProject> = {}): SavedProject {
  const defaultProject: SavedProject = {
    isNew: true,
    description: 'some-name',
    projectId: 'some-project-id',
    removed: false,
    trayId: ''
  }
  return merge(defaultProject, project)
}

export function buildProjectError(projectError: Partial<ProjectError> = {}): ProjectError {
  const defaultProjectError: ProjectError = {
    description: 'some-error',
    prognosis: Prognosis.error,
    timestamp: '',
    trayId: '',
    webUrl: ''
  }
  return merge(defaultProjectError, projectError)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function testReducer(reducer: Partial<Reducer<State>>) {
  return combineReducers<State>(merge({
    [SETTINGS_ROOT]: (state: any = null) => state,
    [BACKUP_ROOT]: (state: any = null) => state,
    [PROJECTS_ROOT]: (state: any = null) => state,
    [SELECTED_ROOT]: (state: any = null) => state,
    [SUCCESS_ROOT]: (state: any = null) => state,
    [TRAYS_ROOT]: (state: any = null) => state,
    [APPLIED_MIGRATIONS_ROOT]: (state: any = null) => state
  }, reducer))
}

/* eslint-enable @typescript-eslint/no-explicit-any */
