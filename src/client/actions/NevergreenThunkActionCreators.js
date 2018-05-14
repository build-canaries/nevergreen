import LocalRepository from '../common/repo/LocalRepository'
import {filter} from '../common/repo/Data'
import {migrate} from '../common/repo/Migrations'
import {initalised, initalising} from './NevergreenActionCreators'

export function initalise() {
  return function (dispatch) {
    dispatch(initalising())
    return LocalRepository.init()
      .then(LocalRepository.load)
      .then((configuration) => dispatch(initalised(filter(migrate(configuration)))))
      .catch(() => {
        // TODO: handle loading configuration failure
      })
  }
}
