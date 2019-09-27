import {useCallback} from 'react'
import {useTimer} from './common/TimerHook'
import {get, send} from './gateways/Gateway'
import semver from 'semver'
import version from '../../resources/version.txt'

interface GitHubResponse {
  readonly tag_name: string;
}

const NEVERGREEN_IO_REGEX = /nevergreen\.io/i
const TWENTY_FOUR_HOURS = 24 * 60 * 60

export function useCheckForNewVersion(loading: boolean, setNotification: (notification: string) => void) {
  const checkVersion = useCallback(() => {
    if (!loading) {
      const check = async () => {
        try {
          const data = await send<GitHubResponse>(get('https://api.github.com/repos/build-canaries/nevergreen/releases/latest'))
          const latestVersion = data.tag_name

          if (semver.gt(latestVersion, version)) {
            const saas = NEVERGREEN_IO_REGEX.test(window.location.hostname)
            const additional = saas ? ', refresh to update' : ' to download from GitHub now'

            setNotification(`A new version ${latestVersion} is available${additional}!`)
          }
        } catch (e) {
          // We don't care if checking for a new version fails
        }
      }
      check()
    }
  }, [loading, setNotification])

  useTimer(checkVersion, TWENTY_FOUR_HOURS)
}
