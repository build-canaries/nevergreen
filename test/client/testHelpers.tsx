import React, {ReactNode} from 'react'
import {merge} from 'lodash'
import {reducer, State} from '../../src/client/Reducer'
import {SETTINGS_ROOT} from '../../src/client/settings/SettingsReducer'
import {BACKUP_ROOT} from '../../src/client/backup/BackupReducer'
import {PROJECTS_ROOT} from '../../src/client/tracking/ProjectsReducer'
import {SELECTED_ROOT} from '../../src/client/tracking/SelectedReducer'
import {SUCCESS_ROOT} from '../../src/client/success/SuccessReducer'
import {TRAYS_ROOT} from '../../src/client/tracking/TraysReducer'
import {createProject, Prognosis, Project} from '../../src/client/domain/Project'
import {createTray, Tray} from '../../src/client/domain/Tray'
import {combineReducers, Reducer} from 'redux'
import {RecursivePartial} from '../../src/client/common/Types'
import {ApiProject} from '../../src/client/gateways/ProjectsGateway'
import {render as testRender} from '@testing-library/react'
import {Provider} from 'react-redux'
import {configureStore} from 'redux-starter-kit'
import {MemoryRouter} from 'react-router-dom'
import Modal from 'react-modal'
import {DEFAULT_PROJECTS_TO_SHOW, DEFAULT_REFRESH_TIME} from '../../src/client/settings/SettingsActionCreators'
import {APPLIED_MIGRATIONS_ROOT} from '../../src/client/configuration/MigrationsReducer'

export function buildState(subState?: RecursivePartial<State>): State {
  return merge({
    [SETTINGS_ROOT]: {
      brokenBuildSoundFx: '',
      clickToShowMenu: false,
      maxProjectsToShow: DEFAULT_PROJECTS_TO_SHOW,
      playBrokenBuildSoundFx: false,
      refreshTime: DEFAULT_REFRESH_TIME,
      showBrokenBuildTime: false,
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

export function render(component: ReactNode, state?: RecursivePartial<State>, location = '/') {
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

export function buildTray(tray?: Partial<Tray>): Tray {
  return createTray('some-tray-id', 'some-url', tray)
}

export function buildProject(project?: Partial<Project>): Project {
  return createProject('some-project-id', 'some-name', project)
}

export function buildApiProject(apiProject?: Partial<ApiProject>): ApiProject {
  return merge({
    activity: '',
    fetchedTime: '',
    isError: false,
    isNew: false,
    job: null,
    lastBuildLabel: '',
    lastBuildStatus: '',
    lastBuildTime: null,
    messages: [],
    name: '',
    nextBuildTime: '',
    owner: null,
    prognosis: Prognosis.unknown,
    projectId: '',
    serverType: '',
    stage: null,
    trayId: '',
    unnormalisedJob: null,
    unnormalisedName: null,
    unnormalisedOwner: null,
    unnormalisedStage: null,
    webUrl: ''
  }, apiProject)
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
