import {get, send} from '../gateways/Gateway'
import semver from 'semver'
import {notify} from './NotificationActionCreators'
import {AnyAction} from 'redux'
import {State} from '../Reducer'
import {ThunkAction} from 'redux-thunk'

const NEVERGREEN_IO_REGEX = /nevergreen\.io/i

interface GitHubResponse {
  readonly tag_name: string;
}

export function checkForNewVersion(currentVersion: string, hostname: string): ThunkAction<Promise<void>, State, undefined, AnyAction> {
  return async (dispatch) => {
    try {
      const data = await send<GitHubResponse>(get('https://api.github.com/repos/build-canaries/nevergreen/releases/latest'))
      const latestVersion = data.tag_name

      if (semver.gt(latestVersion, currentVersion)) {
        const saas = NEVERGREEN_IO_REGEX.test(hostname)
        const additional = saas ? ', refresh to update' : ' to download from GitHub now'

        dispatch(notify(`A new version ${latestVersion} is available${additional}!`))
      }
    } catch (e) {
      // We don't care if checking for a new version fails
    }
  }
}
