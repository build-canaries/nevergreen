import Immutable from 'immutable'
import LocalRepository from '../common/repo/LocalRepository'
import moment from 'moment'
import {get} from '../common/gateways/Gateway'
import semver from 'semver'
import {filter} from '../common/repo/Data'
import {migrate} from '../common/repo/Migrations'

const NEVERGREEN_IO_REGEX = /nevergreen\.io/i

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

export const NOTIFICATION = 'NOTIFICATION'
export function notification(message) {
  return {
    type: NOTIFICATION,
    message
  }
}

export const NOTIFICATION_DISMISS = 'NOTIFICATION_DISMISS'
export function dismiss() {
  return {
    type: NOTIFICATION_DISMISS
  }
}

// TODO: handle loading configuration failure
export function initalise() {
  return function (dispatch) {
    dispatch(initalising())
    momentInit()
    LocalRepository.init()
    return LocalRepository.load()
      .then((configuration) => dispatch(initalised(filter(migrate(configuration)))))
  }
}

export function checkForNewVersion(currentVersion, hostname) {
  return function (dispatch) {
    return get('https://api.github.com/repos/build-canaries/nevergreen/releases/latest').then((data) => {
      if (semver.gt(data.tag_name, currentVersion)) {
        const saas = NEVERGREEN_IO_REGEX.test(hostname)
        const additional = saas ? ', refresh to update' : ' to download from GitHub now'

        dispatch(notification(`A new version ${data.tag_name} is available${additional}!`))
      }
    })
  }
}
