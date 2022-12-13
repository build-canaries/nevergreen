import type { RootState } from '../configuration/ReduxStore'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Prognosis } from '../domain/Project'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import { configurationImported } from './backup/BackupActionCreators'
import * as t from 'io-ts'

export const settingsRoot = 'settings'

export enum MaxProjectsToShow {
  small = 'small',
  medium = 'medium',
  large = 'large',
  all = 'all',
}

export enum SortBy {
  default = 'default',
  description = 'description',
  prognosis = 'prognosis',
  timestamp = 'timestamp',
}

const SettingsState = t.type({
  showTrayName: t.readonly(t.boolean),
  showBuildTime: t.readonly(t.boolean),
  refreshTime: t.readonly(t.number),
  showBuildLabel: t.readonly(t.boolean),
  maxProjectsToShow: t.readonly(
    t.keyof({
      [MaxProjectsToShow.small]: null,
      [MaxProjectsToShow.medium]: null,
      [MaxProjectsToShow.large]: null,
      [MaxProjectsToShow.all]: null,
    })
  ),
  clickToShowMenu: t.readonly(t.boolean),
  showPrognosis: t.readonlyArray(
    t.keyof({
      [Prognosis.healthy]: null,
      [Prognosis.sick]: null,
      [Prognosis.healthyBuilding]: null,
      [Prognosis.sickBuilding]: null,
      [Prognosis.unknown]: null,
      [Prognosis.error]: null,
    })
  ),
  sort: t.readonly(
    t.keyof({
      [SortBy.default]: null,
      [SortBy.description]: null,
      [SortBy.prognosis]: null,
      [SortBy.timestamp]: null,
    })
  ),
})

export const SettingsConfiguration = t.exact(
  t.partial(SettingsState.props),
  settingsRoot
)

export type SettingsState = t.TypeOf<typeof SettingsState>

export const validRefreshTimes = [
  5, 10, 30, 60, 300, 600, 1800, 3600, 43200, 86400,
]

const initialState: SettingsState = {
  showTrayName: false,
  showBuildTime: true,
  refreshTime: 10,
  showBuildLabel: false,
  maxProjectsToShow: MaxProjectsToShow.medium,
  clickToShowMenu: false,
  showPrognosis: [
    Prognosis.sick,
    Prognosis.sickBuilding,
    Prognosis.healthyBuilding,
    Prognosis.unknown,
  ],
  sort: SortBy.default,
}

function absoluteClosestNumber(actual: number, a: number, b: number): number {
  return Math.abs(b - actual) < Math.abs(a - actual) ? b : a
}

const slice = createSlice({
  name: settingsRoot,
  initialState,
  reducers: {
    setShowBuildTime: (draft, action: PayloadAction<boolean>) => {
      draft.showBuildTime = action.payload
    },
    setShowFeedIdentifier: (draft, action: PayloadAction<boolean>) => {
      draft.showTrayName = action.payload
    },
    setRefreshTime: {
      reducer: (draft, action: PayloadAction<number>) => {
        draft.refreshTime = action.payload
      },
      prepare: (value: number) => {
        return {
          payload: validRefreshTimes.reduce((prev, curr) =>
            absoluteClosestNumber(value, prev, curr)
          ),
        }
      },
    },
    setShowBuildLabel: (draft, action: PayloadAction<boolean>) => {
      draft.showBuildLabel = action.payload
    },
    setMaxProjectsToShow: (draft, action: PayloadAction<MaxProjectsToShow>) => {
      draft.maxProjectsToShow = action.payload
    },
    setClickToShowMenu: (draft, action: PayloadAction<boolean>) => {
      draft.clickToShowMenu = action.payload
    },
    setShowPrognosis: (
      draft,
      action: PayloadAction<{ show: boolean; prognosis: Prognosis }>
    ) => {
      const { show, prognosis } = action.payload
      draft.showPrognosis = show
        ? uniq(draft.showPrognosis.concat(prognosis))
        : draft.showPrognosis.filter((p) => p !== prognosis)
    },
    setSort: (draft, action: PayloadAction<SortBy>) => {
      draft.sort = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configurationImported, (draft, action) => {
      return merge(draft, action.payload.settings)
    })
  },
})

export const { reducer } = slice
export const {
  setShowBuildTime,
  setRefreshTime,
  setShowBuildLabel,
  setShowPrognosis,
  setShowFeedIdentifier,
  setMaxProjectsToShow,
  setClickToShowMenu,
  setSort,
} = slice.actions

const getSettings = (state: RootState) => state.settings
export const getShowFeedIdentifier = createSelector(
  getSettings,
  (settings) => settings.showTrayName
)
export const getShowBuildTime = createSelector(
  getSettings,
  (settings) => settings.showBuildTime
)
export const getShowBuildLabel = createSelector(
  getSettings,
  (settings) => settings.showBuildLabel
)
export const getRefreshTime = createSelector(
  getSettings,
  (settings) => settings.refreshTime
)
export const getMaxProjectsToShow = createSelector(
  getSettings,
  (settings) => settings.maxProjectsToShow
)
export const getClickToShowMenu = createSelector(
  getSettings,
  (settings) => settings.clickToShowMenu
)
export const getShowPrognosis = createSelector(
  getSettings,
  (settings) => settings.showPrognosis
)
export const getSort = createSelector(getSettings, (settings) => settings.sort)
