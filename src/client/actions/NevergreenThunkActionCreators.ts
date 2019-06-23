import {init, load} from '../common/LocalRepository'
import {Configuration, toConfiguration} from '../reducers/Configuration'
import {initalising, setConfiguration} from './NevergreenActionCreators'
import {registerServiceWorker} from '../ServiceWorker'
import {notify} from './NotificationActionCreators'
import {AnyAction} from 'redux'
import {State} from '../reducers/Reducer'
import {Actions} from './Actions'
import {getPendingRequest} from '../reducers/PendingRequestsReducer'
import {isEmpty} from 'lodash'
import {ThunkAction} from 'redux-thunk'

export function initalise(): ThunkAction<Promise<void>, State, undefined, AnyAction> {
  return async (dispatch) => {
    dispatch(initalising())

    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker((message) => dispatch(notify(message)))
    }

    try {
      await init()
      const data = await load()
      const [errors, configuration] = toConfiguration(data)

      if (isEmpty(errors)) {
        dispatch(setConfiguration(configuration as Configuration))
      } else {
        // TODO: handle invalid data
      }
    } catch (e) {
      // TODO: handle loading data failure
    }
  }
}

export function abortPendingRequest(id: string): ThunkAction<void, State, undefined, AnyAction> {
  return (dispatch, getState) => {
    const abort = getPendingRequest(getState(), id)
    if (abort) {
      dispatch({type: Actions.ABORT_PENDING_REQUEST, id})
      abort()
    }
  }
}
