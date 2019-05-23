import {Actions} from '../actions/Actions'
import {
  ActionFullScreen,
  ActionInitalised,
  ActionInitalising,
  ActionRequestFullScreen
} from '../actions/NevergreenActionCreators'

export const NEVERGREEN_ROOT = 'nevergreen'

export interface NevergreenState {
  readonly loaded: boolean;
  readonly fullScreen: boolean;
  readonly fullScreenRequested: boolean;
}

type SupportedActions = ActionInitalising | ActionInitalised | ActionFullScreen | ActionRequestFullScreen

const DEFAULT_STATE: NevergreenState = {
  loaded: false,
  fullScreen: false,
  fullScreenRequested: false
}

export function reduce(state = DEFAULT_STATE, action: SupportedActions): NevergreenState {
  switch (action.type) {
    case Actions.INITIALISING:
      return DEFAULT_STATE

    case Actions.INITIALISED:
      return {...state, ...action.data[NEVERGREEN_ROOT], loaded: true}

    case Actions.FULL_SCREEN:
      return {...state, fullScreen: action.enabled}

    case Actions.REQUEST_FULL_SCREEN:
      return {...state, fullScreenRequested: action.requested}

    default:
      return state
  }
}
