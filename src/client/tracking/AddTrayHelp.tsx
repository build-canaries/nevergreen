import React from 'react'
import {HelpArticle, HelpProps} from '../help/HelpArticle'
import {ExternalLink} from '../common/ExternalLink'

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

export function AddTrayHelp({searchQuery}: HelpProps) {
  return (
    <HelpArticle title='Adding a CI server'
                 keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 page='/tracking'>
      <p>
        To start tracking your CI server set the <strong>URL</strong> to point at the CCTray XML feed. You can also
        add a <strong>username</strong> and <strong>password</strong> or an <strong>access token</strong> if your CI
        server is protected by auth.
      </p>
      <p>
        Multiple CCTray XML feeds can be tracked, <ExternalLink
        href='https://www.thoughtworks.com/radar/techniques/a-single-ci-instance-for-all-teams'>allowing you to add
        other teams CI servers</ExternalLink>.
      </p>
    </HelpArticle>
  )
}

export function CCTrayLocationsHelp({searchQuery}: HelpProps) {
  return (
    <HelpArticle title='CCTray XML location'
                 keywords={['tracking', 'adding', 'cctray', 'xml', 'url', 'location', 'find', 'feed']}
                 searchQuery={searchQuery}
                 page='/tracking'>
      See the <ExternalLink href='https://cctray.org/servers/'>CCTray specification servers page</ExternalLink> for
      information about finding the CCTray XML feed for your CI server.
    </HelpArticle>
  )
}
