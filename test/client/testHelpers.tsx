import React, {ReactNode} from 'react'
import {merge} from 'lodash'
import {reducer, State} from '../../src/client/Reducer'
import {MaxProjectsToShow, SETTINGS_ROOT} from '../../src/client/settings/SettingsReducer'
import {PROJECTS_ROOT, SavedProject} from '../../src/client/tracking/ProjectsReducer'
import {SELECTED_ROOT} from '../../src/client/tracking/SelectedReducer'
import {SUCCESS_ROOT} from '../../src/client/settings/success/SuccessReducer'
import {TRAYS_ROOT} from '../../src/client/tracking/TraysReducer'
import {Prognosis, Project, ProjectError} from '../../src/client/domain/Project'
import {createTray, Tray} from '../../src/client/domain/Tray'
import {CombinedState, combineReducers, Middleware, Reducer} from 'redux'
import {RecursivePartial} from '../../src/client/common/Types'
import {render as testRender, RenderResult} from '@testing-library/react'
import {Provider} from 'react-redux'
import {AnyAction, configureStore, EnhancedStore} from '@reduxjs/toolkit'
import {MemoryRouter} from 'react-router-dom'
import Modal from 'react-modal'
import {DEFAULT_REFRESH_TIME} from '../../src/client/settings/SettingsActionCreators'
import {APPLIED_MIGRATIONS_ROOT} from '../../src/client/configuration/MigrationsReducer'
import {SortBy} from '../../src/client/gateways/ProjectsGateway'
import parseISO from 'date-fns/parseISO'
import {BACKUP_REMOTE_LOCATIONS_ROOT, RemoteLocation} from '../../src/client/backup/remote/RemoteLocationsReducer'
import {RemoteLocationOptions} from '../../src/client/backup/remote/RemoteLocationOptions'

interface ExtendedRenderResult extends RenderResult {
  store: EnhancedStore<State, AnyAction, ReadonlyArray<Middleware<unknown, State>>>;
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

  const wrapWithStoreAndRouter = (c: ReactNode) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[location]}>{c}</MemoryRouter>
    </Provider>
  )

  const fns = testRender(wrapWithStoreAndRouter(component))

  return {
    ...fns,
    rerender: (c: ReactNode): void => fns.rerender(wrapWithStoreAndRouter(c)),
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
