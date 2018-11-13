import {Map} from 'immutable'
import {
  BROKEN_BUILD_SOUND_FX, CLICK_TO_SHOW_MENU,
  IMPORT_SUCCESS,
  INITIALISED,
  PLAY_BROKEN_BUILD_SOUND_FX,
  REFRESH_TIME,
  REQUESTING_SYSTEM_NOTIFICATION_PERMISSION,
  SET_MAX_PROJECTS,
  SHOW_BROKEN_BUILD_TIME,
  SHOW_BUILD_LABEL,
  SHOW_BUILD_TIME,
  SHOW_SYSTEM_NOTIFICATIONS,
  SHOW_TRAY_NAME,
  SYSTEM_NOTIFICATIONS_PERMISSION_DENIED
} from '../actions/Actions'
import {DEFAULT_PROJECTS_TO_SHOW, MIN_REFRESH_TIME} from '../actions/SettingsActionCreators'
import defaultSoundFx from '../settings/pacman_death.mp3'

export const SETTINGS_ROOT = 'audioVisual'

const DEFAULT_STATE = Map({
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
})

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORT_SUCCESS:
      return state.merge(action.data.get(SETTINGS_ROOT))

    case SHOW_BUILD_TIME:
      return state.set('showBuildTime', action.value)

    case SHOW_BROKEN_BUILD_TIME:
      return state.set('showBrokenBuildTime', action.value)

    case PLAY_BROKEN_BUILD_SOUND_FX:
      return state.set('playBrokenBuildSoundFx', action.value)

    case BROKEN_BUILD_SOUND_FX:
      return state.set('brokenBuildSoundFx', action.value)

    case SHOW_TRAY_NAME:
      return state.set('showTrayName', action.value)

    case REFRESH_TIME:
      return state.set('refreshTime', action.value)

    case SHOW_BUILD_LABEL:
      return state.set('showBuildLabel', action.value)

    case SHOW_SYSTEM_NOTIFICATIONS:
      return state.withMutations((map) => map
        .set('showSystemNotifications', action.value)
        .set('systemNotificationPermissionDenied', false)
        .set('systemNotificationRequestingPermission', false))

    case REQUESTING_SYSTEM_NOTIFICATION_PERMISSION:
      return state.set('systemNotificationRequestingPermission', true)

    case SYSTEM_NOTIFICATIONS_PERMISSION_DENIED:
      return state.withMutations((map) => map
        .set('systemNotificationPermissionDenied', true)
        .set('systemNotificationRequestingPermission', false))

    case SET_MAX_PROJECTS:
      return state.set('maxProjectsToShow', action.value)

    case CLICK_TO_SHOW_MENU:
      return state.set('clickToShowMenu', action.value)

    default:
      return state
  }
}
