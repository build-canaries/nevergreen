import {Actions} from '../actions/Actions'
import {
  ActionBrokenBuildSoundFx,
  ActionClickToShowMenu,
  ActionPlayBrokenBuildSoundFx,
  ActionRefreshTime,
  ActionRequestingSystemNotificationPermission,
  ActionSetMaxProjects,
  ActionShowBrokenBuildTime,
  ActionShowBuildLabel,
  ActionShowBuildTime,
  ActionShowSystemNotifications,
  ActionShowTrayName,
  ActionSystemNotificationsPermissionDenied,
  DEFAULT_PROJECTS_TO_SHOW,
  MIN_REFRESH_TIME
} from '../actions/SettingsActionCreators'
import defaultSoundFx from '../settings/pacman_death.mp3'
import {ActionInitalised} from '../actions/NevergreenActionCreators'
import {ActionImportSuccess} from '../actions/ImportActionCreators'

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

type SupportedActions = ActionInitalised
  | ActionImportSuccess
  | ActionShowBuildTime
  | ActionShowBrokenBuildTime
  | ActionPlayBrokenBuildSoundFx
  | ActionBrokenBuildSoundFx
  | ActionShowTrayName
  | ActionRefreshTime
  | ActionShowBuildLabel
  | ActionShowSystemNotifications
  | ActionRequestingSystemNotificationPermission
  | ActionSystemNotificationsPermissionDenied
  | ActionSetMaxProjects
  | ActionClickToShowMenu

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

export function reduce(state = DEFAULT_STATE, action: SupportedActions): SettingsState {
  switch (action.type) {
    case Actions.INITIALISED:
    case Actions.IMPORT_SUCCESS:
      return {...state, ...action.data[SETTINGS_ROOT]}

    case Actions.SHOW_BUILD_TIME:
      return {...state, showBuildTime: action.value}

    case Actions.SHOW_BROKEN_BUILD_TIME:
      return {...state, showBrokenBuildTime: action.value}

    case Actions.PLAY_BROKEN_BUILD_SOUND_FX:
      return {...state, playBrokenBuildSoundFx: action.value}

    case Actions.BROKEN_BUILD_SOUND_FX:
      return {...state, brokenBuildSoundFx: action.value}

    case Actions.SHOW_TRAY_NAME:
      return {...state, showTrayName: action.value}

    case Actions.REFRESH_TIME:
      return {...state, refreshTime: action.value}

    case Actions.SHOW_BUILD_LABEL:
      return {...state, showBuildLabel: action.value}

    case Actions.SHOW_SYSTEM_NOTIFICATIONS:
      return {
        ...state,
        showSystemNotifications: action.value,
        systemNotificationPermissionDenied: false,
        systemNotificationRequestingPermission: false
      }

    case Actions.REQUESTING_SYSTEM_NOTIFICATION_PERMISSION:
      return {...state, systemNotificationRequestingPermission: true}

    case Actions.SYSTEM_NOTIFICATIONS_PERMISSION_DENIED:
      return {
        ...state,
        systemNotificationPermissionDenied: true,
        systemNotificationRequestingPermission: false
      }

    case Actions.SET_MAX_PROJECTS:
      return {...state, maxProjectsToShow: action.value}

    case Actions.CLICK_TO_SHOW_MENU:
      return {...state, clickToShowMenu: action.value}

    default:
      return state
  }
}
