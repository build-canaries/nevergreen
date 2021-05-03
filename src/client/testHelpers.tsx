import React, {ReactNode} from 'react'
import merge from 'lodash/merge'
import {reducer, State} from './Reducer'
import {MaxProjectsToShow, SETTINGS_ROOT} from './settings/SettingsReducer'
import {PROJECTS_ROOT, ProjectState} from './tracking/ProjectsReducer'
import {SELECTED_ROOT} from './tracking/SelectedReducer'
import {SUCCESS_ROOT} from './settings/success/SuccessReducer'
import {TRAYS_ROOT} from './tracking/TraysReducer'
import {Prognosis, Project} from './domain/Project'
import {createTray, Tray} from './domain/Tray'
import {CombinedState, combineReducers, Middleware, Reducer} from 'redux'
import {RecursivePartial} from './common/Types'
import {render as testRender, RenderResult} from '@testing-library/react'
import {Provider} from 'react-redux'
import {AnyAction, configureStore, EnhancedStore} from '@reduxjs/toolkit'
import {Router} from 'react-router-dom'
import {createMemoryHistory, History} from 'history'
import Modal from 'react-modal'
import {DEFAULT_REFRESH_TIME} from './settings/SettingsActionCreators'
import {APPLIED_MIGRATIONS_ROOT} from './configuration/MigrationsReducer'
import {ProjectError, SortBy} from './gateways/ProjectsGateway'
import parseISO from 'date-fns/parseISO'
import {BACKUP_REMOTE_LOCATIONS_ROOT, RemoteLocation} from './settings/backup/RemoteLocationsReducer'
import {RemoteLocationOptions} from './settings/backup/RemoteLocationOptions'

interface ExtendedRenderResult extends RenderResult {
  store: EnhancedStore<State, AnyAction, ReadonlyArray<Middleware<unknown, State>>>;
  history: History;
}

export function buildState(subState: RecursivePartial<State> = {}): State {
  const defaultState: State = {
    [SETTINGS_ROOT]: {
      brokenBuildSoundFx: '',
      clickToShowMenu: false,
      maxProjectsToShow: MaxProjectsToShow.medium,
      playBrokenBuildSoundFx: false,
      refreshTime: DEFAULT_REFRESH_TIME,
      showBuildLabel: false,
      showBuildTime: false,
      showSystemNotifications: false,
      showTrayName: false,
      showPrognosis: [],
      sort: SortBy.default,
      enableNewVersionCheck: true
    },
    [PROJECTS_ROOT]: {},
    [SELECTED_ROOT]: {},
    [SUCCESS_ROOT]: [],
    [TRAYS_ROOT]: {},
    [APPLIED_MIGRATIONS_ROOT]: [],
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {}
  }
  return merge(defaultState, subState)
}

export function setupReactModal(): void {
  const appElement = document.createElement('div')
  appElement.setAttribute('id', 'app-element')
  document.body.append(appElement)
  Modal.setAppElement('#app-element')
}

export function render(component: ReactNode, state: RecursivePartial<State> = {}, location = '/'): ExtendedRenderResult {
  const store = configureStore({reducer, preloadedState: buildState(state)})
  const history = createMemoryHistory({initialEntries: [location]})

  const wrapWithStoreAndRouter = (c: ReactNode) => (
    <Provider store={store}>
      <Router history={history}>{c}</Router>
    </Provider>
  )

  const view = testRender(wrapWithStoreAndRouter(component))

  return {
    ...view,
    rerender: (c: ReactNode): void => view.rerender(wrapWithStoreAndRouter(c)),
    store,
    history
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
    previousPrognosis: undefined,
    prognosis: Prognosis.unknown,
    projectId: 'some-project-id',
    serverType: '',
    timestamp: '',
    trayId: '',
    webUrl: ''
  }
  return merge(defaultProject, project)
}

export function buildSavedProject(project: Partial<ProjectState> = {}): ProjectState {
  const defaultProject: ProjectState = {
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

export function buildRemoteBackupLocation(location: Partial<RemoteLocation> = {}): RemoteLocation {
  const defaultLocation: RemoteLocation = {
    internalId: '',
    where: RemoteLocationOptions.Custom,
    url: 'http://some-url',
    exportTimestamp: '',
    importTimestamp: '',
    automaticallyExport: false,
    externalId: '',
    encryptedAccessToken: '',
    description: ''
  }
  return merge(defaultLocation, location)
}

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
export function testReducer(reducer: Partial<Reducer<State>>): Reducer<CombinedState<State>> {
  return combineReducers<State>(merge({
    [SETTINGS_ROOT]: (state: any = null) => state,
    [PROJECTS_ROOT]: (state: any = null) => state,
    [SELECTED_ROOT]: (state: any = null) => state,
    [SUCCESS_ROOT]: (state: any = null) => state,
    [TRAYS_ROOT]: (state: any = null) => state,
    [APPLIED_MIGRATIONS_ROOT]: (state: any = null) => state,
    [BACKUP_REMOTE_LOCATIONS_ROOT]: (state: any = null) => state
  }, reducer))
}

/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */

export function setSystemTime(timestamp: string): void {
  jest.setSystemTime(parseISO(timestamp))
}
