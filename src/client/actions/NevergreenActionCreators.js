import Immutable from 'immutable'
import LocalRepository from '../common/repo/LocalRepository'
import {filter} from '../common/repo/Data'
import {migrate} from '../common/repo/Migrations'
import {FULL_SCREEN, INITIALISED, INITIALISING, NAVIGATED, REQUEST_FULL_SCREEN} from './Actions'

export function initalising() {
  return {type: INITIALISING}
}

export function initalised(configuration) {
  return {type: INITIALISED, data: Immutable.fromJS(configuration)}
}

export function navigated() {
  return {type: NAVIGATED}
}

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

export function enableFullScreen(enabled) {
  return {type: FULL_SCREEN, enabled}
}

export function requestFullScreen(requested) {
  return {type: REQUEST_FULL_SCREEN, requested}
}
