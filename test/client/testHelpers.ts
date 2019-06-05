import {forOwn, merge, noop} from 'lodash'
import {CommonWrapper, EnzymeSelector, ShallowWrapper} from 'enzyme'
import {State} from '../../src/client/reducers/Reducer'
import {SETTINGS_ROOT} from '../../src/client/reducers/SettingsReducer'
import {IMPORT_ROOT} from '../../src/client/reducers/ImportReducer'
import {BACKUP_ROOT} from '../../src/client/reducers/BackupReducer'
import {INTERESTING_ROOT} from '../../src/client/reducers/InterestingReducer'
import {NEVERGREEN_ROOT} from '../../src/client/reducers/NevergreenReducer'
import {NOTIFICATION_ROOT} from '../../src/client/reducers/NotificationReducer'
import {PENDING_REQUESTS_ROOT} from '../../src/client/reducers/PendingRequestsReducer'
import {PROJECTS_ROOT} from '../../src/client/reducers/ProjectsReducer'
import {SELECTED_ROOT} from '../../src/client/reducers/SelectedReducer'
import {SUCCESS_ROOT} from '../../src/client/reducers/SuccessReducer'
import {TRAYS_ROOT} from '../../src/client/reducers/TraysReducer'
import {Prognosis, Project} from '../../src/client/domain/Project'
import {Tray} from '../../src/client/domain/Tray'
import {AnyAction, combineReducers, Reducer} from 'redux'
import {RecursivePartial} from '../../src/client/common/Types'
import {ApiProject} from '../../src/client/gateways/ProjectsGateway'
import {ThunkAction} from 'redux-thunk'

export function locator(name: string) {
  return `[data-locator="${name}"]`
}

export function change(input: CommonWrapper, value: string) {
  input.simulate('change', {target: {value}})
}

export function changeAndBlur(input: CommonWrapper, value: string) {
  change(input, value)
  input.simulate('blur', {target: {value}})
}

export function pressKeyOn(element: CommonWrapper, key: string) {
  element.simulate('keyPress', {key, preventDefault: noop})
}

export function childText(wrapper: ShallowWrapper, selector: EnzymeSelector) {
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
      maxProjectsToShow: 0,
      playBrokenBuildSoundFx: false,
      refreshTime: 0,
      showBrokenBuildTime: false,
      showBuildLabel: false,
      showBuildTime: false,
      showSystemNotifications: false,
      showTrayName: false,
      systemNotificationPermissionDenied: false,
      systemNotificationRequestingPermission: false
    },
    [IMPORT_ROOT]: {
      errors: [],
      infos: [],
      loaded: false
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
    [INTERESTING_ROOT]: {
      loaded: false,
      projects: [],
      errors: []
    },
    [NEVERGREEN_ROOT]: {
      loaded: false,
      fullScreen: false,
      fullScreenRequested: false
    },
    [NOTIFICATION_ROOT]: '',
    [PENDING_REQUESTS_ROOT]: {},
    [PROJECTS_ROOT]: {},
    [SELECTED_ROOT]: {},
    [SUCCESS_ROOT]: [],
    [TRAYS_ROOT]: {}
  }, subState)
}

export function buildTray(tray?: Partial<Tray>): Tray {
  return merge({
    errors: [],
    highlight: false,
    includeNew: false,
    loaded: false,
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
    [IMPORT_ROOT]: (state: any = null) => state,
    [BACKUP_ROOT]: (state: any = null) => state,
    [INTERESTING_ROOT]: (state: any = null) => state,
    [NEVERGREEN_ROOT]: (state: any = null) => state,
    [NOTIFICATION_ROOT]: (state: any = null) => state,
    [PENDING_REQUESTS_ROOT]: (state: any = null) => state,
    [PROJECTS_ROOT]: (state: any = null) => state,
    [SELECTED_ROOT]: (state: any = null) => state,
    [SUCCESS_ROOT]: (state: any = null) => state,
    [TRAYS_ROOT]: (state: any = null) => state
  }, reducer))
}

/* eslint-enable @typescript-eslint/no-explicit-any */
