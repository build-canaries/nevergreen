import {Actions} from '../actions/Actions'
import {
  ActionBrokenBuildSoundFx,
  ActionClickToShowMenu,
  ActionPlayBrokenBuildSoundFx,
  ActionRefreshTime,
  ActionSetMaxProjects,
  ActionShowBrokenBuildTime,
  ActionShowBuildLabel,
  ActionShowBuildTime,
  ActionShowSystemNotifications,
  ActionShowTrayName,
  DEFAULT_PROJECTS_TO_SHOW,
  MIN_REFRESH_TIME
} from '../actions/SettingsActionCreators'
import defaultSoundFx from '../settings/pacman_death.mp3'
import {ActionSetConfiguration} from '../actions/NevergreenActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {State} from './Reducer'

export interface SettingsState {
  readonly showTrayName: boolean;
  readonly showBuildTime: boolean;
  readonly showBrokenBuildTime: boolean;
  readonly playBrokenBuildSoundFx: boolean;
  readonly brokenBuildSoundFx: string;
  readonly refreshTime: number;
  readonly showBuildLabel: boolean;
  readonly showSystemNotifications: boolean;
  readonly systemNotificationRequestingPermission: boolean;
  readonly systemNotificationPermissionDenied: boolean;
  readonly maxProjectsToShow: number;
  readonly clickToShowMenu: boolean;
}

export const SETTINGS_ROOT = 'audioVisual'

const DEFAULT_STATE: SettingsState = {
  showTrayName: false,
  showBuildTime: true,
  showBrokenBuildTime: true,
  playBrokenBuildSoundFx: false,
  brokenBuildSoundFx: defaultSoundFx,
  refreshTime: MIN_REFRESH_TIME,
  showBuildLabel: false,
  showSystemNotifications: false,
  systemNotificationRequestingPermission: false,
  systemNotificationPermissionDenied: false,
  maxProjectsToShow: DEFAULT_PROJECTS_TO_SHOW,
  clickToShowMenu: false
}

export const reduce = createReducer<SettingsState>(DEFAULT_STATE, {
  [Actions.SET_CONFIGURATION]: (draft, action: ActionSetConfiguration) => {
    return {...draft, ...action.configuration[SETTINGS_ROOT]}
  },
  [Actions.SHOW_BUILD_TIME]: (draft, action: ActionShowBuildTime) => {
    draft.showBuildTime = action.value
  },
  [Actions.SHOW_BROKEN_BUILD_TIME]: (draft, action: ActionShowBrokenBuildTime) => {
    draft.showBrokenBuildTime = action.value
  },
  [Actions.PLAY_BROKEN_BUILD_SOUND_FX]: (draft, action: ActionPlayBrokenBuildSoundFx) => {
    draft.playBrokenBuildSoundFx = action.value
  },
  [Actions.BROKEN_BUILD_SOUND_FX]: (draft, action: ActionBrokenBuildSoundFx) => {
    draft.brokenBuildSoundFx = action.value
  },
  [Actions.SHOW_TRAY_NAME]: (draft, action: ActionShowTrayName) => {
    draft.showTrayName = action.value
  },
  [Actions.REFRESH_TIME]: (draft, action: ActionRefreshTime) => {
    draft.refreshTime = action.value
  },
  [Actions.SHOW_BUILD_LABEL]: (draft, action: ActionShowBuildLabel) => {
    draft.showBuildLabel = action.value
  },
  [Actions.SHOW_SYSTEM_NOTIFICATIONS]: (draft, action: ActionShowSystemNotifications) => {
    draft.showSystemNotifications = action.value
    draft.systemNotificationPermissionDenied = false
    draft.systemNotificationRequestingPermission = false
  },
  [Actions.REQUESTING_SYSTEM_NOTIFICATION_PERMISSION]: (draft) => {
    draft.systemNotificationRequestingPermission = true
  },
  [Actions.SYSTEM_NOTIFICATIONS_PERMISSION_DENIED]: (draft) => {
    draft.systemNotificationPermissionDenied = true
    draft.systemNotificationRequestingPermission = false
  },
  [Actions.SET_MAX_PROJECTS]: (draft, action: ActionSetMaxProjects) => {
    draft.maxProjectsToShow = action.value
  },
  [Actions.CLICK_TO_SHOW_MENU]: (draft, action: ActionClickToShowMenu) => {
    draft.clickToShowMenu = action.value
  }
})

export const getShowTrayName = createSelector<State, boolean>([[SETTINGS_ROOT, 'showTrayName']])
export const getShowBuildTime = createSelector<State, boolean>([[SETTINGS_ROOT, 'showBuildTime']])
export const getShowBrokenBuildTime = createSelector<State, boolean>([[SETTINGS_ROOT, 'showBrokenBuildTime']])
export const getPlayBrokenBuildSoundFx = createSelector<State, boolean>([[SETTINGS_ROOT, 'playBrokenBuildSoundFx']])
export const getShowBuildLabel = createSelector<State, boolean>([[SETTINGS_ROOT, 'showBuildLabel']])
export const getShowSystemNotifications = createSelector<State, boolean>([[SETTINGS_ROOT, 'showSystemNotifications']])
export const getSystemNotificationRequestingPermission = createSelector<State, boolean>([[SETTINGS_ROOT, 'systemNotificationRequestingPermission']])
export const getSystemNotificationPermissionDenied = createSelector<State, boolean>([[SETTINGS_ROOT, 'systemNotificationPermissionDenied']])
export const getBrokenBuildSoundFx = createSelector<State, string>([[SETTINGS_ROOT, 'brokenBuildSoundFx']])
export const getRefreshTime = createSelector<State, number>([[SETTINGS_ROOT, 'refreshTime']])
export const getMaxProjectsToShow = createSelector<State, number>([[SETTINGS_ROOT, 'maxProjectsToShow']])
export const getClickToShowMenu = createSelector<State, boolean>([[SETTINGS_ROOT, 'clickToShowMenu']])
