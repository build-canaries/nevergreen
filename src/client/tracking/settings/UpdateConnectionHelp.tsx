import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../help/HelpForms'
import {ROUTE_TRACKING_FEED_CONNECTION} from '../../Routes'

const KEYWORDS = [
  'tracking',
  'settings',
  'url',
  'server type',
  'username',
  'password',
  'access token',
  'auth'
]

export function UpdateConnectionHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={KEYWORDS}
      searchQuery={searchQuery}
      title='Update connection'
      page={ROUTE_TRACKING_FEED_CONNECTION}>
      <HelpForm>
        <HelpInput name='URL'>
          The URL of the CCTray XML feed.
        </HelpInput>
        <HelpInput name='Authentication'>
          Since credentials are stored encrypted they can not be pre-populated, the <em>Keep existing auth</em> option
          makes it possible to update the URL without being forced to re-enter the auth details.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
