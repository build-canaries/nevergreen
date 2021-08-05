import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../help/HelpArticle'
import {ExternalLink} from '../common/ExternalLink'
import {ROUTE_SETTINGS_TRACKING} from '../Routes'

const KEYWORDS = [
  'tracking',
  'adding',
  'cctray',
  'xml',
  'url',
  'username',
  'password',
  'access token',
  'auth',
  'getting started'
]

export function AddTrayHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle title='Adding a CCTray XML feed'
                 keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 page={ROUTE_SETTINGS_TRACKING}>
      <p>
        To start tracking your projects set the <strong>URL</strong> to point at the CCTray XML feed. You can also
        add a <strong>username</strong> and <strong>password</strong> or an <strong>access token</strong> if your CCTray
        XML feed is protected by auth.
      </p>
      <p>
        Multiple CCTray XML feeds can be tracked, <ExternalLink
        href='https://www.thoughtworks.com/radar/techniques/a-single-ci-instance-for-all-teams'>allowing you to track
        other teams projects</ExternalLink>.
      </p>
    </HelpArticle>
  )
}

export function CCTrayLocationsHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle title='CCTray XML feed location'
                 keywords={['tracking', 'adding', 'cctray', 'xml', 'url', 'location', 'find', 'feed']}
                 searchQuery={searchQuery}
                 page={ROUTE_SETTINGS_TRACKING}>
      See the <ExternalLink href='https://cctray.org/servers/'>CCTray specification servers page</ExternalLink> for
      information about finding the CCTray XML feed for your server.
    </HelpArticle>
  )
}
