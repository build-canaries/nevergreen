import { get } from './gateways/Gateway'
import greaterThan from 'semver/functions/gt'
import version from '../../resources/version.txt'
import { getEnableNewVersionCheck } from './settings/notifications/NotificationsReducer'
import { useQuery } from '@tanstack/react-query'
import { useAppSelector } from './configuration/Hooks'

interface GitHubResponse {
  readonly tag_name: string
}

const twentyFourHours = 24 * 60 * 60 * 1000

export function useCheckForNewVersion(
  showBanner: (message: string) => void
): void {
  const shouldCheckForNewVersion = useAppSelector(getEnableNewVersionCheck)

  useQuery(
    ['check-for-new-version'],
    async ({ signal }) => {
      return await get<GitHubResponse>({
        url: 'https://api.github.com/repos/build-canaries/nevergreen/releases/latest',
        signal,
      })
    },
    {
      enabled: shouldCheckForNewVersion,
      refetchInterval: twentyFourHours,
      onSuccess: (data) => {
        const latestVersion = data.tag_name
        if (greaterThan(latestVersion, version)) {
          showBanner(
            `A new version ${latestVersion} is available to download from GitHub now!`
          )
        }
      },
    }
  )
}
