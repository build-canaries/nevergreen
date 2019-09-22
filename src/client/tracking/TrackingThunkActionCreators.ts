import {removeTray} from './TrackingActionCreators'
import {refreshTray} from './RefreshThunkActionCreators'
import {State} from '../Reducer'
import {AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {abortPendingRequest} from '../NevergreenThunkActionCreators'
import {getTrayRequiresRefresh} from './TraysReducer'

export function removeTrayThunk(trayId: string): ThunkAction<void, State, undefined, AnyAction> {
  return (dispatch) => {
    dispatch(abortPendingRequest(trayId))
    dispatch(removeTray(trayId))
  }
}

export function checkRefresh(trayId: string): ThunkAction<void, State, undefined, AnyAction> {
  return (dispatch, getState) => {
    if (getTrayRequiresRefresh(trayId)(getState())) {
      dispatch(refreshTray(trayId))
    }
  }
}
