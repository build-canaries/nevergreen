import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../help/HelpForms'
import {ROUTE_TRACKING} from '../../AppRoutes'

const keywords = [
  'tracking',
  'adding',
  'cctray',
  'xml',
  'getting started'
]

export function TrackingPageHelp({searchQuery, helpLink}: HelpProps): ReactElement {
  return (
    <HelpArticle title='Tracking'
                 keywords={keywords}
                 searchQuery={searchQuery}
                 page={ROUTE_TRACKING}>
      <HelpForm>
        <HelpInput name='Poll for feed changes every'>
          How often to check the CI server(s) for project updates.
        </HelpInput>
        <HelpInput name='Add feed'>
          Adds a new feed.
        </HelpInput>
      </HelpForm>
      <p>Added feeds will appear and can be managed from this page.</p>
      <HelpForm>
        <HelpInput name='Manage projects'>
          This allows you to select interesting projects to display on the Monitor page.
        </HelpInput>
        <HelpInput name='Update details'>
          This allows you to update details for the feed, such as the URL or name.
        </HelpInput>
        <HelpInput name='Remove'>
          This will permanently delete the feed. Feeds can be re-added at any time and you can also
          make a backup before deleting {helpLink('backup')}.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
