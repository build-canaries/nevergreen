import React, {ReactNode} from 'react'
import merge from 'lodash/merge'
import {reducer, State} from './Reducer'
import {MaxProjectsToShow, SETTINGS_ROOT} from './settings/SettingsReducer'
import {PROJECTS_ROOT, ProjectState} from './settings/tracking/ProjectsReducer'
import {SELECTED_ROOT} from './settings/tracking/SelectedReducer'
import {SUCCESS_ROOT} from './settings/success/SuccessReducer'
import {FEEDS_ROOT} from './settings/tracking/FeedsReducer'
import {Prognosis, Project} from './domain/Project'
import {createFeed, Feed} from './domain/Feed'
import {CombinedState, combineReducers, Middleware, Reducer} from 'redux'
import {RecursivePartial} from './common/Types'
import {render as testRender, RenderResult} from '@testing-library/react'
import {Provider} from 'react-redux'
import {AnyAction, configureStore, EnhancedStore} from '@reduxjs/toolkit'
import {BrowserRouter, Outlet} from 'react-router-dom'
import Modal from 'react-modal'
import {DEFAULT_REFRESH_TIME} from './settings/SettingsActionCreators'
import {APPLIED_MIGRATIONS_ROOT} from './configuration/MigrationsReducer'
import {ProjectError, SortBy} from './gateways/ProjectsGateway'
import parseISO from 'date-fns/parseISO'
import {BACKUP_REMOTE_LOCATIONS_ROOT, RemoteLocation} from './settings/backup/RemoteLocationsReducer'
import {RemoteLocationOptions} from './settings/backup/RemoteLocationOptions'
import {Route, Routes} from 'react-router'
import {QueryClient, QueryClientProvider} from 'react-query'

interface ExtendedRenderResult extends RenderResult {
  readonly store: EnhancedStore<State, AnyAction, ReadonlyArray<Middleware<unknown, State>>>;
}

interface RenderOptions {
  readonly mountPath?: string;
  readonly currentLocation?: string;
  readonly state?: RecursivePartial<State>;
  readonly outletContext?: unknown;
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
    [FEEDS_ROOT]: {},
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

export function render(component: ReactNode, options: RenderOptions = {}): ExtendedRenderResult {
  const mergedOptions = {
    mountPath: '/*',
    currentLocation: '/',
    state: {},
    ...options
  }
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  })
  const store = configureStore({reducer, preloadedState: buildState(mergedOptions.state)})

  window.history.pushState({}, '', mergedOptions.currentLocation)

  const wrapWithStoreAndRouter = (c: ReactNode) => (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<Outlet context={mergedOptions.outletContext}/>}>
              <Route path={mergedOptions.mountPath} element={c}/>
              <Route path='*' element={<>location changed</>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  )

  const view = testRender(wrapWithStoreAndRouter(component))

  return {
    ...view,
    rerender: (c: ReactNode): void => view.rerender(wrapWithStoreAndRouter(c)),
    store
  }
}

export function buildFeed(feed: Partial<Feed> = {}): Feed {
  return createFeed('some-tray-id', 'http://some-url', feed)
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
    [FEEDS_ROOT]: (state: any = null) => state,
    [APPLIED_MIGRATIONS_ROOT]: (state: any = null) => state,
    [BACKUP_REMOTE_LOCATIONS_ROOT]: (state: any = null) => state
  }, reducer))
}

/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */

export function setSystemTime(timestamp: string): void {
  jest.setSystemTime(parseISO(timestamp))
}
