import {get, send} from './gateways/Gateway'
import greaterThan from 'semver/functions/gt'
import version from '../../resources/version.txt'
import {useSelector} from 'react-redux'
import {getToggleVersionCheck} from './settings/notifications/NotificationsReducer'
import {useQuery} from 'react-query'

interface GitHubResponse {
  readonly tag_name: string;
}

const twentyFourHours = 24 * 60 * 60 * 1000

export function useCheckForNewVersion(showBanner: (message: string) => void): void {
  const shouldCheckForNewVersion = useSelector(getToggleVersionCheck)

  useQuery('check-for-new-version', async ({signal}) => {
    return await send<GitHubResponse>(get('https://api.github.com/repos/build-canaries/nevergreen/releases/latest'), signal)
  }, {
    enabled: shouldCheckForNewVersion,
    refetchInterval: twentyFourHours,
    onSuccess: (data) => {
      const latestVersion = data.tag_name
      if (greaterThan(latestVersion, version)) {
        showBanner(`A new version ${latestVersion} is available to download from GitHub now!`)
      }
    }
  })
}
