import type { RootState } from '../../configuration/ReduxStore'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Prognosis } from '../../domain/Project'
import merge from 'lodash/merge'
import { configurationImported } from '../backup/BackupActionCreators'
import { z } from 'zod'
import defaultSoundFx from '../notifications/pacman_death.mp3'
import { isNotBlank } from '../../common/Utils'

export const prognosisSettingsRoot = 'prognosis'

type SetPrognosisAction = PayloadAction<
  PrognosisState & {
    prognosis: Prognosis
  }
>

const PrognosisState = z.object({
  show: z.boolean(),
  systemNotification: z.boolean(),
  sfx: z.string(),
  backgroundColour: z.string(),
  textColour: z.string(),
})

export const PrognosisSettingsState = z.object({
  [Prognosis.healthy]: PrognosisState,
  [Prognosis.sick]: PrognosisState,
  [Prognosis.healthyBuilding]: PrognosisState,
  [Prognosis.sickBuilding]: PrognosisState,
  [Prognosis.unknown]: PrognosisState,
  [Prognosis.error]: PrognosisState,
})

export type PrognosisSettingsState = z.infer<typeof PrognosisSettingsState>
export const PrognosisSettingsConfiguration =
  PrognosisSettingsState.partial().extend({
    [Prognosis.healthy]: PrognosisState.partial(),
    [Prognosis.sick]: PrognosisState.partial(),
    [Prognosis.healthyBuilding]: PrognosisState.partial(),
    [Prognosis.sickBuilding]: PrognosisState.partial(),
    [Prognosis.unknown]: PrognosisState.partial(),
    [Prognosis.error]: PrognosisState.partial(),
  })
type PrognosisState = z.infer<typeof PrognosisState>

const initialState: PrognosisSettingsState = {
  [Prognosis.healthy]: {
    show: false,
    systemNotification: false,
    sfx: '',
    backgroundColour: '#058943',
    textColour: '#ffffff',
  },
  [Prognosis.sick]: {
    show: true,
    systemNotification: false,
    sfx: defaultSoundFx,
    backgroundColour: '#b30400',
    textColour: '#fffed7',
  },
  [Prognosis.healthyBuilding]: {
    show: true,
    systemNotification: false,
    sfx: '',
    backgroundColour: '#ffff18',
    textColour: '#4a2f27',
  },
  [Prognosis.sickBuilding]: {
    show: true,
    systemNotification: false,
    sfx: '',
    backgroundColour: '#d14904',
    textColour: '#ffffff',
  },
  [Prognosis.unknown]: {
    show: false,
    systemNotification: false,
    sfx: '',
    backgroundColour: '#ececec',
    textColour: '#212121',
  },
  [Prognosis.error]: {
    show: true,
    systemNotification: false,
    sfx: '',
    backgroundColour: '#de3535',
    textColour: '#ffffff',
  },
}

const slice = createSlice({
  name: prognosisSettingsRoot,
  initialState,
  reducers: {
    setPrognosis: (draft, action: SetPrognosisAction) => {
      const { prognosis, ...payload } = action.payload
      draft[prognosis] = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configurationImported, (draft, action) => {
      merge(draft, action.payload.configuration.prognosis)
    })
  },
})

export const { reducer } = slice
export const { setPrognosis } = slice.actions

export const getAllPrognosisSettings = (state: RootState) =>
  state[prognosisSettingsRoot]
export function getPrognosisSettings(
  prognosis: Prognosis,
): (state: RootState) => PrognosisState {
  return createSelector(
    getAllPrognosisSettings,
    (settings) => settings[prognosis],
  )
}
export const getShowPrognosis = createSelector(
  getAllPrognosisSettings,
  (settings) =>
    Object.entries(settings)
      .filter(([, settings]) => settings.show)
      .map(([prognosis]) => prognosis as Prognosis),
)
export const getAudioNotificationPrognosis = createSelector(
  getAllPrognosisSettings,
  (settings) =>
    Object.entries(settings)
      .filter(([, settings]) => isNotBlank(settings.sfx))
      .map(([prognosis]) => prognosis as Prognosis),
)
export const getSystemNotificationPrognosis = createSelector(
  getAllPrognosisSettings,
  (settings) =>
    Object.entries(settings)
      .filter(([, settings]) => settings.systemNotification)
      .map(([prognosis]) => prognosis as Prognosis),
)
