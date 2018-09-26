import {init, load} from '../common/repo/LocalRepository'
import {filter} from '../common/repo/Data'
import {migrate} from '../common/repo/Migrations'
import {initalised, initalising} from './NevergreenActionCreators'

export function initalise() {
  return async (dispatch) => {
    dispatch(initalising())

    await init()
    const configuration = await load()
    dispatch(initalised(filter(migrate(configuration))))
    // TODO: handle loading configuration failure
  }
}
