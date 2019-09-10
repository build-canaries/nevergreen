import {Actions} from './Actions'
import {ActionFullScreen, ActionRequestFullScreen} from './NevergreenActionCreators'
import {createReducer, createSelector} from 'redux-starter-kit'
import {State} from './Reducer'

export const NEVERGREEN_ROOT = 'nevergreen'

export interface NevergreenState {
  readonly fullScreen: boolean;
  readonly fullScreenRequested: boolean;
}

const DEFAULT_STATE: NevergreenState = {
  fullScreen: false,
  fullScreenRequested: false
}

export const reduce = createReducer<NevergreenState>(DEFAULT_STATE, {
  [Actions.FULL_SCREEN]: (draft, action: ActionFullScreen) => {
    draft.fullScreen = action.enabled
  },
  [Actions.REQUEST_FULL_SCREEN]: (draft, action: ActionRequestFullScreen) => {
    draft.fullScreenRequested = action.requested
  }
})

const getNevergreen = (state: State) => state[NEVERGREEN_ROOT]
export const getFullScreen = createSelector(getNevergreen, (state) => state.fullScreen)
export const getFullScreenRequested = createSelector(getNevergreen, (state) => state.fullScreenRequested)
