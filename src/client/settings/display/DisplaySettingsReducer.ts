import type { RootState } from '../../configuration/ReduxStore'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Prognosis } from '../../domain/Project'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import { configurationImported } from '../backup/BackupActionCreators'
import { z } from 'zod'

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

const PrognosisState = z.object({
  backgroundColour: z.string(),
  textColour: z.string(),
})

const DisplaySettingsState = z.object({
  showTrayName: z.boolean(),
  showBuildTime: z.boolean(),
  refreshTime: z.number(),
  showBuildLabel: z.boolean(),
  showPrognosisName: z.boolean(),
  maxProjectsToShow: z.nativeEnum(MaxProjectsToShow),
  showPrognosis: z.array(z.nativeEnum(Prognosis)),
  sort: z.nativeEnum(SortBy),
  [Prognosis.healthy]: PrognosisState,
  [Prognosis.sick]: PrognosisState,
  [Prognosis.healthyBuilding]: PrognosisState,
  [Prognosis.sickBuilding]: PrognosisState,
  [Prognosis.unknown]: PrognosisState,
  [Prognosis.error]: PrognosisState,
})

export const DisplaySettingsConfiguration = DisplaySettingsState.partial()

export type DisplaySettingsState = z.infer<typeof DisplaySettingsState>

export const validRefreshTimes = [
  5, 10, 30, 60, 300, 600, 1800, 3600, 43200, 86400,
]

const initialState: DisplaySettingsState = {
  showTrayName: false,
  showBuildTime: true,
  refreshTime: 10,
  showBuildLabel: false,
  showPrognosisName: true,
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
            absoluteClosestNumber(value, prev, curr),
          ),
        }
      },
    },
    setShowBuildLabel: (draft, action: PayloadAction<boolean>) => {
      draft.showBuildLabel = action.payload
    },
    setShowPrognosisName: (draft, action: PayloadAction<boolean>) => {
      draft.showPrognosisName = action.payload
    },
    setMaxProjectsToShow: (draft, action: PayloadAction<MaxProjectsToShow>) => {
      draft.maxProjectsToShow = action.payload
    },
    setShowPrognosis: (
      draft,
      action: PayloadAction<{ show: boolean; prognosis: Prognosis }>,
    ) => {
      const { show, prognosis } = action.payload
      draft.showPrognosis = show
        ? uniq(draft.showPrognosis.concat(prognosis))
        : draft.showPrognosis.filter((p) => p !== prognosis)
    },
    setPrognosisBackgroundColour: (
      draft,
      action: PayloadAction<{ colour: string; prognosis: Prognosis }>,
    ) => {
      const { colour, prognosis } = action.payload
      draft[prognosis].backgroundColour = colour
    },
    setPrognosisTextColour: (
      draft,
      action: PayloadAction<{ colour: string; prognosis: Prognosis }>,
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
  setShowPrognosisName,
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
  (settings) => settings.showTrayName,
)
export const getShowBuildTime = createSelector(
  getDisplaySettings,
  (settings) => settings.showBuildTime,
)
export const getShowBuildLabel = createSelector(
  getDisplaySettings,
  (settings) => settings.showBuildLabel,
)
export const getShowPrognosisName = createSelector(
  getDisplaySettings,
  (settings) => settings.showPrognosisName,
)
export const getRefreshTime = createSelector(
  getDisplaySettings,
  (settings) => settings.refreshTime,
)
export const getMaxProjectsToShow = createSelector(
  getDisplaySettings,
  (settings) => settings.maxProjectsToShow,
)
export const getShowPrognosis = createSelector(
  getDisplaySettings,
  (settings) => settings.showPrognosis,
)
export const getSort = createSelector(
  getDisplaySettings,
  (settings) => settings.sort,
)
