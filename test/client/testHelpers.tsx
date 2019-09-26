import React, {ReactNode} from 'react'
import {forOwn, merge, noop} from 'lodash'
import {CommonWrapper, EnzymeSelector, ShallowWrapper} from 'enzyme'
import {reducer, State} from '../../src/client/Reducer'
import {SETTINGS_ROOT} from '../../src/client/settings/SettingsReducer'
import {BACKUP_ROOT} from '../../src/client/backup/BackupReducer'
import {NEVERGREEN_ROOT} from '../../src/client/NevergreenReducer'
import {NOTIFICATION_ROOT} from '../../src/client/notification/NotificationReducer'
import {PROJECTS_ROOT} from '../../src/client/tracking/ProjectsReducer'
import {SELECTED_ROOT} from '../../src/client/tracking/SelectedReducer'
import {SUCCESS_ROOT} from '../../src/client/success/SuccessReducer'
import {TRAYS_ROOT} from '../../src/client/tracking/TraysReducer'
import {Prognosis, Project} from '../../src/client/domain/Project'
import {AuthTypes, Tray} from '../../src/client/domain/Tray'
import {AnyAction, combineReducers, Reducer} from 'redux'
import {RecursivePartial} from '../../src/client/common/Types'
import {ApiProject} from '../../src/client/gateways/ProjectsGateway'
import {ThunkAction} from 'redux-thunk'
import {render as testRender} from '@testing-library/react'
import {Provider} from 'react-redux'
import {configureStore} from 'redux-starter-kit'
import {HashRouter} from 'react-router-dom'
import Modal from 'react-modal'
import {DEFAULT_PROJECTS_TO_SHOW, MIN_REFRESH_TIME} from '../../src/client/settings/SettingsActionCreators'

export function locator(name: string) {
  return `[data-locator="${name}"]`
}

export function change(input: CommonWrapper, value: string) {
  input.simulate('change', {target: {value}})
}

export function pressKeyOn(element: CommonWrapper, key: string) {
  element.simulate('keyPress', {key, preventDefault: noop})
}

export function childText(wrapper: ShallowWrapper, selector: EnzymeSelector) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return wrapper.find(selector).shallow().text()
}

const UNDISPLAYABLE = {
  'null': null,
  undefined,
  'a blank string': ' ',
  'an empty string': ''
}

export function forUndisplayableStrings(fn: (value: string | null | undefined, friendlyName: string) => void) {
  forOwn(UNDISPLAYABLE, fn)
}

export function buildState(subState?: RecursivePartial<State>): State {
  return merge({
    [SETTINGS_ROOT]: {
      brokenBuildSoundFx: '',
      clickToShowMenu: false,
      maxProjectsToShow: DEFAULT_PROJECTS_TO_SHOW,
      playBrokenBuildSoundFx: false,
      refreshTime: MIN_REFRESH_TIME,
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
    [NEVERGREEN_ROOT]: {
      loaded: false,
      fullScreen: false,
      fullScreenRequested: false
    },
    [NOTIFICATION_ROOT]: '',
    [PROJECTS_ROOT]: {},
    [SELECTED_ROOT]: {},
    [SUCCESS_ROOT]: [],
    [TRAYS_ROOT]: {}
  }, subState)
}

export function setupReactModal() {
  const appElement = document.createElement('div')
  appElement.setAttribute('id', 'app-element')
  document.body.append(appElement)
  Modal.setAppElement('#app-element')
}

export function render(component: ReactNode, state?: RecursivePartial<State>) {
  const store = configureStore({reducer, preloadedState: buildState(state)})

  const wrapWithStoreAndRouter = (c: ReactNode) => (
    <Provider store={store}>
      <HashRouter>{c}</HashRouter>
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
  return merge({
    authType: AuthTypes.none,
    highlight: false,
    includeNew: false,
    requiresRefresh: false,
    serverType: '',
    trayId: '',
    url: ''
  }, tray)
}

export function buildProject(project?: Partial<Project>): Project {
  return merge({
    fetchedTime: '',
    isNew: false,
    lastBuildLabel: '',
    lastBuildTime: '',
    lastBuildStatus: '',
    name: '',
    removed: false,
    projectId: '',
    url: '',
    trayId: '',
    prognosis: Prognosis.unknown,
    serverType: ''
  }, project)
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
    prognosis: Prognosis,
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

export async function testThunk<R>(thunkion: ThunkAction<R, State, undefined, AnyAction>, state = buildState()) {
  const dispatch = jest.fn()

  const getState = () => state

  await thunkion(dispatch, getState, undefined)

  return dispatch
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function testReducer(reducer: Partial<Reducer<State>>) {
  return combineReducers<State>(merge({
    [SETTINGS_ROOT]: (state: any = null) => state,
    [BACKUP_ROOT]: (state: any = null) => state,
    [NEVERGREEN_ROOT]: (state: any = null) => state,
    [NOTIFICATION_ROOT]: (state: any = null) => state,
    [PROJECTS_ROOT]: (state: any = null) => state,
    [SELECTED_ROOT]: (state: any = null) => state,
    [SUCCESS_ROOT]: (state: any = null) => state,
    [TRAYS_ROOT]: (state: any = null) => state
  }, reducer))
}

/* eslint-enable @typescript-eslint/no-explicit-any */
