import Immutable from 'immutable'
import LocalRepository from '../common/repo/LocalRepository'
import moment from 'moment'
import {filter} from '../common/repo/Data'
import {migrate} from '../common/repo/Migrations'

function momentInit() {
  moment.updateLocale('en', {
    relativeTime: {
      future: '%s',
      past: '%s',
      s: '<1m',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1mo',
      MM: '%dmo',
      y: '1y',
      yy: '%dy'
    }
  })
}

export const INITIALISING = 'INITIALISING'
export function initalising() {
  return {
    type: INITIALISING
  }
}

export const INITIALISED = 'INITIALISED'
export function initalised(configuration) {
  return {
    type: INITIALISED,
    data: Immutable.fromJS(configuration)
  }
}

export function initalise() {
  return function (dispatch) {
    dispatch(initalising())
    momentInit()
    return LocalRepository.init()
      .then(LocalRepository.load)
      .then((configuration) => dispatch(initalised(filter(migrate(configuration)))))
      .catch(() => {
        // TODO: handle loading configuration failure
      })
  }
}
