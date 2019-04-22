import {init, load} from '../common/LocalRepository'
import {wrapConfiguration} from '../reducers/Configuration'
import {initalised, initalising} from './NevergreenActionCreators'
import {registerServiceWorker} from '../ServiceWorker'
import {notify} from './NotificationActionCreators'

export function initalise() {
  return async (dispatch) => {
    dispatch(initalising())

    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker((message) => dispatch(notify(message)))
    }

    try {
      await init()
      const data = await load()

      dispatch(initalised(wrapConfiguration(data)))
    } catch (e) {
      // TODO: handle loading configuration failure
    }
  }
}
