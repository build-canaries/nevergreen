import {Actions} from '../../Actions'
import {createTray, Tray} from '../../domain/Tray'
import {ActionProjectsFetched, ActionRemoveTray, ActionTrayAdded, ActionTrayUpdate} from './TrackingActionCreators'
import {createReducer, createSelector} from '@reduxjs/toolkit'
import {Draft} from 'immer'
import {State} from '../../Reducer'
import {ActionConfigurationImported} from '../backup/BackupActionCreators'
import isNil from 'lodash/isNil'

export interface TraysState {
  readonly [trayId: string]: Tray;
}

export const TRAYS_ROOT = 'trays'

const DEFAULT_STATE: TraysState = {}

function handleImportedConfiguration(draft: TraysState, action: ActionConfigurationImported) {
  if (isNil(action.configuration[TRAYS_ROOT])) {
    return draft
  }

  const importedTrays = action.configuration[TRAYS_ROOT] as TraysState
  const newState: Draft<TraysState> = {}

  Object.keys(importedTrays).forEach((trayId) => {
    const partialTray = importedTrays[trayId]
    newState[trayId] = createTray(trayId, partialTray.url, partialTray)
  })

  return newState
}

export const reduce = createReducer<TraysState>(DEFAULT_STATE, {
  [Actions.CONFIGURATION_IMPORTED]: handleImportedConfiguration,
  [Actions.TRAY_ADDED]: (draft, action: ActionTrayAdded) => {
    draft[action.trayId] = action.data
  },
  [Actions.TRAY_UPDATED]: (draft, action: ActionTrayUpdate) => {
    Object.assign(draft[action.trayId], action.data)
  },
  [Actions.TRAY_REMOVED]: (draft, action: ActionRemoveTray) => {
    delete draft[action.trayId]
  },
  [Actions.PROJECTS_FETCHED]: (draft, action: ActionProjectsFetched) => {
    draft[action.trayId].timestamp = action.timestamp
    draft[action.trayId].serverType = action.serverType
  }
})

const getTracking = (state: State) => state[TRAYS_ROOT]
export const getTrays = createSelector(getTracking, (trays) => Object.values(trays))

export function getTray(id: string): (state: State) => Tray | undefined {
  return createSelector(getTracking, (trays) => trays[id])
}
