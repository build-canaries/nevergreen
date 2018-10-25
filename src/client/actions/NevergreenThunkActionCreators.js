import {init, load} from '../common/LocalRepository'
import {wrapConfiguration} from '../reducers/Configuration'
import {initalised, initalising} from './NevergreenActionCreators'

export function initalise() {
  return async (dispatch) => {
    dispatch(initalising())

    try {
      await init()
      const data = await load()

      dispatch(initalised(wrapConfiguration(data)))
    } catch (e) {
      // TODO: handle loading configuration failure
    }
  }
}
