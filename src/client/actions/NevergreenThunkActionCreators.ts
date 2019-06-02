import {init, load} from '../common/LocalRepository'
import {filter} from '../reducers/Configuration'
import {initalised, initalising} from './NevergreenActionCreators'
import {registerServiceWorker} from '../ServiceWorker'
import {notify} from './NotificationActionCreators'
import {Dispatch} from 'redux'
import {State} from '../reducers/Reducer'
import {Actions} from './Actions'
import {getPendingRequest} from '../reducers/PendingRequestsReducer'

export function initalise() {
  return async (dispatch: Dispatch) => {
    dispatch(initalising())

    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker((message) => dispatch(notify(message)))
    }

    try {
      await init()
      const data = await load()

      dispatch(initalised(filter(data)))
    } catch (e) {
      // TODO: handle loading configuration failure
    }
  }
}

export function abortPendingRequest(id: string) {
  return (dispatch: Dispatch, getState: () => State) => {
    const abort = getPendingRequest(getState(), id)
    if (abort) {
      dispatch({type: Actions.ABORT_PENDING_REQUEST, id})
      abort()
    }
  }
}
