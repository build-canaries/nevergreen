import type { RootState } from '../../configuration/ReduxStore'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Prognosis } from '../../domain/Project'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import { configurationImported } from '../backup/BackupActionCreators'
import * as t from 'io-ts'

export const displaySettingsRoot = 'settings'

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

const PrognosisState = t.readonly(
  t.type({
    backgroundColour: t.readonly(t.string),
    textColour: t.readonly(t.string),
  })
)

const DisplaySettingsState = t.type({
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
  [Prognosis.healthy]: PrognosisState,
  [Prognosis.sick]: PrognosisState,
  [Prognosis.healthyBuilding]: PrognosisState,
  [Prognosis.sickBuilding]: PrognosisState,
  [Prognosis.unknown]: PrognosisState,
  [Prognosis.error]: PrognosisState,
})

export const DisplaySettingsConfiguration = t.exact(
  t.partial(DisplaySettingsState.props),
  displaySettingsRoot
)

export type DisplaySettingsState = t.TypeOf<typeof DisplaySettingsState>

export const validRefreshTimes = [
  5, 10, 30, 60, 300, 600, 1800, 3600, 43200, 86400,
]

const initialState: DisplaySettingsState = {
  showTrayName: false,
  showBuildTime: true,
  refreshTime: 10,
  showBuildLabel: false,
  maxProjectsToShow: MaxProjectsToShow.medium,
  showPrognosis: [
    Prognosis.sick,
    Prognosis.sickBuilding,
    Prognosis.healthyBuilding,
    Prognosis.unknown,
  ],
  sort: SortBy.default,
  [Prognosis.healthy]: {
    backgroundColour: '#058943',
    textColour: '#ffffff',
  },
  [Prognosis.sick]: {
    backgroundColour: '#b30400',
    textColour: '#fffed7',
  },
  [Prognosis.healthyBuilding]: {
    backgroundColour: '#ffff18',
    textColour: '#4a2f27',
  },
  [Prognosis.sickBuilding]: {
    backgroundColour: '#d14904',
    textColour: '#ffffff',
  },
  [Prognosis.unknown]: {
    backgroundColour: '#ececec',
    textColour: '#212121',
  },
  [Prognosis.error]: {
    backgroundColour: '#de3535',
    textColour: '#ffffff',
  },
}

function absoluteClosestNumber(actual: number, a: number, b: number): number {
  return Math.abs(b - actual) < Math.abs(a - actual) ? b : a
}

const slice = createSlice({
  name: displaySettingsRoot,
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
    setShowPrognosis: (
      draft,
      action: PayloadAction<{ show: boolean; prognosis: Prognosis }>
    ) => {
      const { show, prognosis } = action.payload
      draft.showPrognosis = show
        ? uniq(draft.showPrognosis.concat(prognosis))
        : draft.showPrognosis.filter((p) => p !== prognosis)
    },
    setPrognosisBackgroundColour: (
      draft,
      action: PayloadAction<{ colour: string; prognosis: Prognosis }>
    ) => {
      const { colour, prognosis } = action.payload
      draft[prognosis].backgroundColour = colour
    },
    setPrognosisTextColour: (
      draft,
      action: PayloadAction<{ colour: string; prognosis: Prognosis }>
    ) => {
      const { colour, prognosis } = action.payload
      draft[prognosis].textColour = colour
    },
    setSort: (draft, action: PayloadAction<SortBy>) => {
      draft.sort = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configurationImported, (draft, action) => {
      merge(draft, action.payload.configuration.settings)
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
  setSort,
  setPrognosisTextColour,
  setPrognosisBackgroundColour,
} = slice.actions

export const getDisplaySettings = (state: RootState) => state.settings
export const getShowFeedIdentifier = createSelector(
  getDisplaySettings,
  (settings) => settings.showTrayName
)
export const getShowBuildTime = createSelector(
  getDisplaySettings,
  (settings) => settings.showBuildTime
)
export const getShowBuildLabel = createSelector(
  getDisplaySettings,
  (settings) => settings.showBuildLabel
)
export const getRefreshTime = createSelector(
  getDisplaySettings,
  (settings) => settings.refreshTime
)
export const getMaxProjectsToShow = createSelector(
  getDisplaySettings,
  (settings) => settings.maxProjectsToShow
)
export const getShowPrognosis = createSelector(
  getDisplaySettings,
  (settings) => settings.showPrognosis
)
export const getSort = createSelector(
  getDisplaySettings,
  (settings) => settings.sort
)
