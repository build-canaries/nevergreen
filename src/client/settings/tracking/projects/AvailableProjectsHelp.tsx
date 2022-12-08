import React, { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../../help/HelpForms'
import { ROUTE_TRACKING_PROJECTS } from '../../../AppRoutes'

const keywords = [
  'tracking',
  'manage projects',
  'tracking mode',
  'refresh',
  'include all',
  'exclude all',
  'search',
]

export function AvailableProjectsHelp({
  searchQuery,
  helpLink,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Manage projects"
      page={ROUTE_TRACKING_PROJECTS}
    >
      <HelpForm>
        <HelpInput name="Tracking mode">
          <dl>
            <dt>Everything</dt>
            <dd>All projects returned by the feed will be tracked.</dd>
            <dt>Selected</dt>
            <dd>This allows projects to be selected manually for tracking.</dd>
          </dl>
        </HelpInput>
        <p>
          The following options are only available if Tracking mode is{' '}
          <em>Selected</em>.
        </p>
        <HelpInput name="Refresh">
          Fetches the latest list of projects from the CCTray XML feed. If
          projects are added, removed or renamed on the server you will need to
          refresh to see them in Nevergreen.
        </HelpInput>
        <HelpInput name="Include all">
          Includes all the currently shown projects for tracking, which means
          they will be shown on the Monitor page if they are interesting{' '}
          {helpLink('interesting projects')}.
        </HelpInput>
        <HelpInput name="Exclude all">
          Excludes all the currently shown projects for tracking, which means
          they will never be shown on the Monitor page.
        </HelpInput>
        <HelpInput name="Search">
          Searches for any projects with matching names. Clear the input to show
          all projects again. The include all and exclude all buttons work on
          the currently visible projects, so searching can be used to quickly
          include or exclude a group of projects.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
