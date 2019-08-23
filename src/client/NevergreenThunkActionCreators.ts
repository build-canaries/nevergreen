import {AnyAction} from 'redux'
import {State} from './Reducer'
import {Actions} from './Actions'
import {getPendingRequest} from './PendingRequestsReducer'
import {ThunkAction} from 'redux-thunk'

export function abortPendingRequest(id: string): ThunkAction<void, State, undefined, AnyAction> {
  return (dispatch, getState) => {
    const abort = getPendingRequest(getState(), id)
    if (abort) {
      dispatch({type: Actions.ABORT_PENDING_REQUEST, id})
      abort()
    }
  }
}
