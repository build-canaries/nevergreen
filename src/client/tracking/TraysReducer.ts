import {Actions} from '../Actions'
import {Tray} from '../domain/Tray'
import {ActionSetConfiguration} from '../NevergreenActionCreators'
import {ActionProjectsFetched, ActionRemoveTray, ActionTrayAdded, ActionTrayUpdate} from './TrackingActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {Draft} from 'immer'
import {State} from '../Reducer'

export interface TraysState {
  readonly [trayId: string]: Tray;
}

export const TRAYS_ROOT = 'trays'

const DEFAULT_STATE: TraysState = {}

export const reduce = createReducer<TraysState>(DEFAULT_STATE, {
  [Actions.SET_CONFIGURATION]: (draft: Draft<TraysState>, action: ActionSetConfiguration) => {
    const newState: Draft<TraysState> = {}
    const data = action.configuration[TRAYS_ROOT] as TraysState || draft
    Object.keys(data).forEach((trayId) => {
      newState[trayId] = data[trayId] as Draft<Tray>
    })
    return newState
  },
  [Actions.TRAY_ADDED]: (draft, action: ActionTrayAdded) => {
    draft[action.trayId] = action.data as Draft<Tray>
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
