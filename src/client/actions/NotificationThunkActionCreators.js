import {get} from '../common/gateways/Gateway'
import {send} from '../common/gateways/GitHubGateway'
import semver from 'semver'
import {notify} from './NotificationActionCreators'

const NEVERGREEN_IO_REGEX = /nevergreen\.io/i

export function checkForNewVersion(currentVersion, hostname) {
  return async (dispatch) => {
    try {
      const data = await send(get('https://api.github.com/repos/build-canaries/nevergreen/releases/latest'))
      if (semver.gt(data.tag_name, currentVersion)) {
        const saas = NEVERGREEN_IO_REGEX.test(hostname)
        const additional = saas ? ', refresh to update' : ' to download from GitHub now'

        dispatch(notify(`A new version ${data.tag_name} is available${additional}!`))
      }
    } catch (e) {
      // We don't care if checking for a new version fails
    }
  }
}
