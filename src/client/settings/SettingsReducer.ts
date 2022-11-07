import {Actions} from '../Actions'
import {
  ActionClickToShowMenu,
  ActionRefreshTime,
  ActionSetMaxProjects,
  ActionSetSort,
  ActionShowBuildLabel,
  ActionShowBuildTime,
  ActionShowFeedIdentifier,
  ActionShowPrognosis,
  DEFAULT_REFRESH_TIME
} from './SettingsActionCreators'
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
  readonly refreshTime: number;
  readonly showBuildLabel: boolean;
  readonly maxProjectsToShow: MaxProjectsToShow;
  readonly clickToShowMenu: boolean;
  readonly showPrognosis: ReadonlyArray<Prognosis>;
  readonly sort: SortBy;
}

export const SETTINGS_ROOT = 'settings'

const defaultState: SettingsState = {
  showTrayName: false,
  showBuildTime: true,
  refreshTime: DEFAULT_REFRESH_TIME,
  showBuildLabel: false,
  maxProjectsToShow: MaxProjectsToShow.medium,
  clickToShowMenu: false,
  showPrognosis: [
    Prognosis.sick,
    Prognosis.sickBuilding,
    Prognosis.healthyBuilding,
    Prognosis.unknown
  ],
  sort: SortBy.default
}

export const reduce = createReducer<SettingsState>(defaultState, (builder) => {
  builder
    .addCase(Actions.CONFIGURATION_IMPORTED, (draft, action: ActionConfigurationImported) => {
      const importedState = get(action.configuration, SETTINGS_ROOT, {}) as SettingsState
      return {...draft, ...importedState}
    })
    .addCase(Actions.SHOW_BUILD_TIME, (draft, action: ActionShowBuildTime) => {
      draft.showBuildTime = action.value
    })
    .addCase(Actions.SHOW_FEED_IDENTIFIER, (draft, action: ActionShowFeedIdentifier) => {
      draft.showTrayName = action.value
    })
    .addCase(Actions.REFRESH_TIME, (draft, action: ActionRefreshTime) => {
      draft.refreshTime = action.value
    })
    .addCase(Actions.SHOW_BUILD_LABEL, (draft, action: ActionShowBuildLabel) => {
      draft.showBuildLabel = action.value
    })
    .addCase(Actions.SET_MAX_PROJECTS, (draft, action: ActionSetMaxProjects) => {
      draft.maxProjectsToShow = action.value
    })
    .addCase(Actions.CLICK_TO_SHOW_MENU, (draft, action: ActionClickToShowMenu) => {
      draft.clickToShowMenu = action.value
    })
    .addCase(Actions.SHOW_PROGNOSIS, (draft, action: ActionShowPrognosis) => {
      draft.showPrognosis = action.show
        ? uniq(draft.showPrognosis.concat(action.prognosis))
        : draft.showPrognosis.filter((prognosis) => prognosis !== action.prognosis)
    })
    .addCase(Actions.SET_SORT, (draft, action: ActionSetSort) => {
      draft.sort = action.value
    })
})

function getSettings(state: State) {
  return state[SETTINGS_ROOT]
}

export const getShowFeedIdentifier = createSelector(getSettings, (settings) => settings.showTrayName)
export const getShowBuildTime = createSelector(getSettings, (settings) => settings.showBuildTime)
export const getShowBuildLabel = createSelector(getSettings, (settings) => settings.showBuildLabel)
export const getRefreshTime = createSelector(getSettings, (settings) => settings.refreshTime)
export const getMaxProjectsToShow = createSelector(getSettings, (settings) => settings.maxProjectsToShow)
export const getClickToShowMenu = createSelector(getSettings, (settings) => settings.clickToShowMenu)
export const getShowPrognosis = createSelector(getSettings, (settings) => settings.showPrognosis)
export const getSort = createSelector(getSettings, (settings) => settings.sort)
