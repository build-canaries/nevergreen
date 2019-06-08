import {Actions} from '../actions/Actions'
import {ActionFullScreen, ActionRequestFullScreen} from '../actions/NevergreenActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {State} from './Reducer'

export const NEVERGREEN_ROOT = 'nevergreen'

export interface NevergreenState {
  readonly loaded: boolean;
  readonly fullScreen: boolean;
  readonly fullScreenRequested: boolean;
}

const DEFAULT_STATE: NevergreenState = {
  loaded: false,
  fullScreen: false,
  fullScreenRequested: false
}

export const reduce = createReducer<NevergreenState>(DEFAULT_STATE, {
  [Actions.INITIALISING]: () => {
    return DEFAULT_STATE
  },
  [Actions.SET_CONFIGURATION]: (draft) => {
    draft.loaded = true
  },
  [Actions.FULL_SCREEN]: (draft, action: ActionFullScreen) => {
    draft.fullScreen = action.enabled
  },
  [Actions.REQUEST_FULL_SCREEN]: (draft, action: ActionRequestFullScreen) => {
    draft.fullScreenRequested = action.requested
  }
})

export const getLoaded = createSelector<State, boolean>([[NEVERGREEN_ROOT, 'loaded']])
export const getFullScreen = createSelector<State, boolean>([[NEVERGREEN_ROOT, 'fullScreen']])
export const getFullScreenRequested = createSelector<State, boolean>([[NEVERGREEN_ROOT, 'fullScreenRequested']])
