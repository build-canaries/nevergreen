import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { ExternalLink } from '../../common/ExternalLink'
import { RoutePaths } from '../../AppRoutes'
import {
  ConnectionFormHelp,
  keywords as connectionKeywords,
} from './ConnectionFormHelp'

const keywords = [
  'tracking',
  'adding',
  'cctray',
  'xml',
  'getting started',
  ...connectionKeywords,
]

export function AddFeedHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      title="Adding a CCTray XML feed"
      keywords={keywords}
      searchQuery={searchQuery}
      page={RoutePaths.trackingAdd}
    >
      <ConnectionFormHelp />
      <p>
        Multiple CCTray XML feeds can be tracked,{' '}
        <ExternalLink href="https://www.thoughtworks.com/radar/techniques/a-single-ci-instance-for-all-teams">
          allowing you to track other teams projects
        </ExternalLink>
        .
      </p>
    </HelpArticle>
  )
}

export function CCTrayLocationsHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      title="CCTray XML feed location"
      keywords={[
        'tracking',
        'adding',
        'cctray',
        'xml',
        'url',
        'location',
        'find',
        'feed',
      ]}
      searchQuery={searchQuery}
      page={RoutePaths.trackingAdd}
    >
      See the{' '}
      <ExternalLink href="https://cctray.org/servers/">
        CCTray specification servers page
      </ExternalLink>{' '}
      for information about finding the CCTray XML feed for your server.
    </HelpArticle>
  )
}
