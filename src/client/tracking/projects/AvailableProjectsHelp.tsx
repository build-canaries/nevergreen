import React, {ReactElement} from 'react'
import styles from '../../help/help-article.scss'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'

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
      <dl className={styles.helpSettings}>
        <dt>Refresh</dt>
        <dd>
          Fetches the latest list of projects from the CCTray XML feed. If projects are added, removed or renamed on the
          server you will need to refresh to see them in Nevergreen.
        </dd>
        <dt>Include all</dt>
        <dd>
          Includes all the currently shown {helpLink('search')} projects for tracking which means they can be shown
          on the Monitor page if they are interesting {helpLink('interesting projects')}.
        </dd>
        <dt>Exclude all</dt>
        <dd>
          Excludes all the currently shown {helpLink('search')} projects for tracking which means they will never be
          shown on the Monitor page.
        </dd>
        <dt>Search</dt>
        <dd>
          Takes a regular expression and searches for any projects with matching names. Clear the input to show all
          projects again. The include all and exclude all buttons work on the currently visible projects, so searching
          can be used to quickly include or exclude a group of projects.
        </dd>
      </dl>
    </HelpArticle>
  )
}
