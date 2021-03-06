import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../help/HelpForms'

const KEYWORDS = [
  'tracking',
  'adding',
  'projects',
  'refresh',
  'include all',
  'exclude all',
  'search'
]

export function AvailableProjectsHelp({searchQuery, helpLink}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='CCTray XML feed projects'
                 page='/tracking'>
      <p>
        Once added you can choose which projects to include for tracking by selecting them.
      </p>
      <HelpForm>
        <HelpInput name='Refresh'>
          Fetches the latest list of projects from the CCTray XML feed. If projects are added, removed or renamed on the
          server you will need to refresh to see them in Nevergreen.
        </HelpInput>
        <HelpInput name='Include all'>
          Includes all the currently shown {helpLink('search')} projects for tracking which means they can be shown
          on the Monitor page if they are interesting {helpLink('interesting projects')}.
        </HelpInput>
        <HelpInput name='Exclude all'>
          Excludes all the currently shown {helpLink('search')} projects for tracking which means they will never be
          shown on the Monitor page.
        </HelpInput>
        <HelpInput name='Search'>
          Takes a regular expression and searches for any projects with matching names. Clear the input to show all
          projects again. The include all and exclude all buttons work on the currently visible projects, so searching
          can be used to quickly include or exclude a group of projects.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
