import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../help/HelpForms'
import {ROUTE_TRACKING_FEED_PROJECTS} from '../../Routes'

const KEYWORDS = [
  'tracking',
  'manage projects',
  'refresh',
  'include all',
  'exclude all',
  'search'
]

export function AvailableProjectsHelp({searchQuery, helpLink}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='Manage projects'
                 page={ROUTE_TRACKING_FEED_PROJECTS}>
      <HelpForm>
        <HelpInput name='Refresh'>
          Fetches the latest list of projects from the CCTray XML feed. If projects are added, removed or renamed on the
          server you will need to refresh to see them in Nevergreen.
        </HelpInput>
        <HelpInput name='Include all'>
          Includes all the currently shown projects for tracking, which means they will be shown on the Monitor
          page if they are interesting {helpLink('interesting projects')}.
        </HelpInput>
        <HelpInput name='Exclude all'>
          Excludes all the currently shown projects for tracking, which means they will never be shown on the
          Monitor page.
        </HelpInput>
        <HelpInput name='Search'>
          Searches for any projects with matching names. Clear the input to show all projects again. The include all
          and exclude all buttons work on the currently visible projects, so searching can be used to quickly include
          or exclude a group of projects.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
