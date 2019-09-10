import {Actions} from '../Actions'
import {
  ActionBrokenBuildSoundFx,
  ActionClickToShowMenu,
  ActionPlayBrokenBuildSoundFx,
  ActionRefreshTime,
  ActionSetMaxProjects,
  ActionShowBrokenBuildTime,
  ActionShowBuildLabel,
  ActionShowBuildTime,
  ActionShowPrognosis,
  ActionShowSystemNotifications,
  ActionShowTrayName,
  DEFAULT_PROJECTS_TO_SHOW,
  MIN_REFRESH_TIME
} from './SettingsActionCreators'
import defaultSoundFx from './pacman_death.mp3'
import {ActionSetConfiguration} from '../NevergreenActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {State} from '../Reducer'
import {Prognosis} from '../domain/Project'
import {uniq} from 'lodash'
import {Draft} from 'immer'

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
  readonly showPrognosis: ReadonlyArray<Prognosis>;
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
  clickToShowMenu: false,
  showPrognosis: [
    Prognosis.sick,
    Prognosis.sickBuilding,
    Prognosis.healthyBuilding,
    Prognosis.unknown
  ]
}

export const reduce = createReducer<SettingsState>(DEFAULT_STATE, {
  [Actions.SET_CONFIGURATION]: (draft: Draft<SettingsState>, action: ActionSetConfiguration) => {
    return {...draft, ...action.configuration[SETTINGS_ROOT]} as Draft<SettingsState>
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
  },
  [Actions.SHOW_PROGNOSIS]: (draft, action: ActionShowPrognosis) => {
    draft.showPrognosis = action.show
      ? uniq(draft.showPrognosis.concat(action.prognosis))
      : draft.showPrognosis.filter((prognosis) => prognosis !== action.prognosis)
  }
})

const getSettings = (state: State) => state[SETTINGS_ROOT]
export const getShowTrayName = createSelector(getSettings, (settings) => settings.showTrayName)
export const getShowBuildTime = createSelector(getSettings, (settings) => settings.showBuildTime)
export const getShowBrokenBuildTime = createSelector(getSettings, (settings) => settings.showBrokenBuildTime)
export const getPlayBrokenBuildSoundFx = createSelector(getSettings, (settings) => settings.playBrokenBuildSoundFx)
export const getShowBuildLabel = createSelector(getSettings, (settings) => settings.showBuildLabel)
export const getShowSystemNotifications = createSelector(getSettings, (settings) => settings.showSystemNotifications)
export const getSystemNotificationRequestingPermission = createSelector(getSettings, (settings) => settings.systemNotificationRequestingPermission)
export const getSystemNotificationPermissionDenied = createSelector(getSettings, (settings) => settings.systemNotificationPermissionDenied)
export const getBrokenBuildSoundFx = createSelector(getSettings, (settings) => settings.brokenBuildSoundFx)
export const getRefreshTime = createSelector(getSettings, (settings) => settings.refreshTime)
export const getMaxProjectsToShow = createSelector(getSettings, (settings) => settings.maxProjectsToShow)
export const getClickToShowMenu = createSelector(getSettings, (settings) => settings.clickToShowMenu)
export const getShowPrognosis = createSelector(getSettings, (settings) => settings.showPrognosis)
