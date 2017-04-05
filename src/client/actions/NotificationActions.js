import {get, send} from '../common/gateways/Gateway'
import semver from 'semver'
import _ from 'lodash'

const NEVERGREEN_IO_REGEX = /nevergreen\.io/i

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

export function checkForNewVersion(currentVersion, hostname) {
  return function (dispatch) {
    return send(get('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')).then((data) => {
      if (semver.gt(data.tag_name, currentVersion)) {
        const saas = NEVERGREEN_IO_REGEX.test(hostname)
        const additional = saas ? ', refresh to update' : ' to download from GitHub now'

        dispatch(notification(`A new version ${data.tag_name} is available${additional}!`))
      }
    }).catch(_.noop) // We don't care if checking for a new version fails
  }
}
