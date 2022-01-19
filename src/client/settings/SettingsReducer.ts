import {Actions} from '../Actions'
import {
  ActionBrokenBuildSoundFx,
  ActionClickToShowMenu,
  ActionPlayBrokenBuildSoundFx,
  ActionRefreshTime,
  ActionSetMaxProjects,
  ActionSetSort,
  ActionShowBuildLabel,
  ActionShowBuildTime,
  ActionShowPrognosis,
  ActionShowSystemNotifications,
  ActionShowFeedIdentifier,
  DEFAULT_REFRESH_TIME
} from './SettingsActionCreators'
import defaultSoundFx from './notifications/pacman_death.mp3'
import {createReducer, createSelector} from '@reduxjs/toolkit'
import {State} from '../Reducer'
import {Prognosis} from '../domain/Project'
import get from 'lodash/get'
import uniq from 'lodash/uniq'
import {ActionConfigurationImported} from './backup/BackupActionCreators'
import {SortBy} from '../gateways/ProjectsGateway'

export enum MaxProjectsToShow {
  small = 'small',
  medium = 'medium',
  large = 'large',
  all = 'all'
}

export interface SettingsState {
  readonly showTrayName: boolean;
  readonly showBuildTime: boolean;
  readonly playBrokenBuildSoundFx: boolean;
  readonly brokenBuildSoundFx: string;
  readonly refreshTime: number;
  readonly showBuildLabel: boolean;
  readonly showSystemNotifications: boolean;
  readonly maxProjectsToShow: MaxProjectsToShow;
  readonly clickToShowMenu: boolean;
  readonly showPrognosis: ReadonlyArray<Prognosis>;
  readonly sort: SortBy;
  readonly enableNewVersionCheck: boolean;
}

export const SETTINGS_ROOT = 'settings'

const DEFAULT_STATE: SettingsState = {
  showTrayName: false,
  showBuildTime: true,
  playBrokenBuildSoundFx: false,
  brokenBuildSoundFx: defaultSoundFx,
  refreshTime: DEFAULT_REFRESH_TIME,
  showBuildLabel: false,
  showSystemNotifications: false,
  maxProjectsToShow: MaxProjectsToShow.medium,
  clickToShowMenu: false,
  showPrognosis: [
    Prognosis.sick,
    Prognosis.sickBuilding,
    Prognosis.healthyBuilding,
    Prognosis.unknown
  ],
  sort: SortBy.default,
  enableNewVersionCheck: true
}

export const reduce = createReducer<SettingsState>(DEFAULT_STATE, {
  [Actions.CONFIGURATION_IMPORTED]: (draft, action: ActionConfigurationImported) => {
    const importedState = get(action.configuration, SETTINGS_ROOT, {}) as SettingsState
    return {...draft, ...importedState}
  },
  [Actions.SHOW_BUILD_TIME]: (draft, action: ActionShowBuildTime) => {
    draft.showBuildTime = action.value
  },
  [Actions.TOGGLE_VERSION_CHECK]: (draft) => {
    draft.enableNewVersionCheck = !draft.enableNewVersionCheck
  },
  [Actions.PLAY_BROKEN_BUILD_SOUND_FX]: (draft, action: ActionPlayBrokenBuildSoundFx) => {
    draft.playBrokenBuildSoundFx = action.value
  },
  [Actions.BROKEN_BUILD_SOUND_FX]: (draft, action: ActionBrokenBuildSoundFx) => {
    draft.brokenBuildSoundFx = action.value
  },
  [Actions.SHOW_FEED_IDENTIFIER]: (draft, action: ActionShowFeedIdentifier) => {
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
  },
  [Actions.SET_SORT]: (draft, action: ActionSetSort) => {
    draft.sort = action.value
  }
})

function getSettings(state: State) {
  return state[SETTINGS_ROOT]
}

export const getShowFeedIdentifier = createSelector(getSettings, (settings) => settings.showTrayName)
export const getShowBuildTime = createSelector(getSettings, (settings) => settings.showBuildTime)
export const getToggleVersionCheck = createSelector(getSettings, (settings) => settings.enableNewVersionCheck)
export const getPlayBrokenBuildSoundFx = createSelector(getSettings, (settings) => settings.playBrokenBuildSoundFx)
export const getShowBuildLabel = createSelector(getSettings, (settings) => settings.showBuildLabel)
export const getShowSystemNotifications = createSelector(getSettings, (settings) => settings.showSystemNotifications)
export const getBrokenBuildSoundFx = createSelector(getSettings, (settings) => settings.brokenBuildSoundFx)
export const getRefreshTime = createSelector(getSettings, (settings) => settings.refreshTime)
export const getMaxProjectsToShow = createSelector(getSettings, (settings) => settings.maxProjectsToShow)
export const getClickToShowMenu = createSelector(getSettings, (settings) => settings.clickToShowMenu)
export const getShowPrognosis = createSelector(getSettings, (settings) => settings.showPrognosis)
export const getSort = createSelector(getSettings, (settings) => settings.sort)
