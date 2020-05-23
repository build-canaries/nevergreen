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
  ActionShowTrayName,
  DEFAULT_PROJECTS_TO_SHOW,
  DEFAULT_REFRESH_TIME
} from './SettingsActionCreators'
import defaultSoundFx from './pacman_death.mp3'
import {createReducer, createSelector} from '@reduxjs/toolkit'
import {State} from '../Reducer'
import {Prognosis} from '../domain/Project'
import {get, uniq} from 'lodash'
import {ActionConfigurationImported} from '../backup/BackupActionCreators'
import {SortBy} from '../gateways/ProjectsGateway'

export interface SettingsState {
  readonly showTrayName: boolean;
  readonly showBuildTime: boolean;
  readonly playBrokenBuildSoundFx: boolean;
  readonly brokenBuildSoundFx: string;
  readonly refreshTime: number;
  readonly showBuildLabel: boolean;
  readonly showSystemNotifications: boolean;
  readonly maxProjectsToShow: number;
  readonly clickToShowMenu: boolean;
  readonly showPrognosis: ReadonlyArray<Prognosis>;
  readonly sort: SortBy;
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
  maxProjectsToShow: DEFAULT_PROJECTS_TO_SHOW,
  clickToShowMenu: false,
  showPrognosis: [
    Prognosis.sick,
    Prognosis.sickBuilding,
    Prognosis.healthyBuilding,
    Prognosis.unknown
  ],
  sort: SortBy.default
}

export const reduce = createReducer<SettingsState>(DEFAULT_STATE, {
  [Actions.CONFIGURATION_IMPORTED]: (draft, action: ActionConfigurationImported) => {
    const importedState = get(action.configuration, SETTINGS_ROOT, {}) as SettingsState
    return {...draft, ...importedState}
  },
  [Actions.SHOW_BUILD_TIME]: (draft, action: ActionShowBuildTime) => {
    draft.showBuildTime = action.value
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

export const getShowTrayName = createSelector(getSettings, (settings) => settings.showTrayName)
export const getShowBuildTime = createSelector(getSettings, (settings) => settings.showBuildTime)
export const getPlayBrokenBuildSoundFx = createSelector(getSettings, (settings) => settings.playBrokenBuildSoundFx)
export const getShowBuildLabel = createSelector(getSettings, (settings) => settings.showBuildLabel)
export const getShowSystemNotifications = createSelector(getSettings, (settings) => settings.showSystemNotifications)
export const getBrokenBuildSoundFx = createSelector(getSettings, (settings) => settings.brokenBuildSoundFx)
export const getRefreshTime = createSelector(getSettings, (settings) => settings.refreshTime)
export const getMaxProjectsToShow = createSelector(getSettings, (settings) => settings.maxProjectsToShow)
export const getClickToShowMenu = createSelector(getSettings, (settings) => settings.clickToShowMenu)
export const getShowPrognosis = createSelector(getSettings, (settings) => settings.showPrognosis)
export const getSort = createSelector(getSettings, (settings) => settings.sort)
