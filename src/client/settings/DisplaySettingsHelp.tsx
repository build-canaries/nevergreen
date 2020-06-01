import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../help/HelpArticle'
import styles from '../help/help-article.scss'

const KEYWORDS = [
  'settings',
  'display',
  'show feed identifier',
  'show build time',
  'show build label',
  'interesting projects',
  'sick',
  'sick building',
  'healthy',
  'healthy building',
  'unknown',
  'amount of projects to show',
  'sort projects by',
  'preview display'
]

export function DisplaySettingsHelp({searchQuery, helpLink}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='Display settings'
                 page='/settings'>
      <dl className={styles.helpSettings}>
        <dt>Show feed identifier</dt>
        <dd>
          When <em>enabled</em> the CI server name {helpLink('name')} or URL will be displayed on the Monitor page.
        </dd>
        <dt>Show build time</dt>
        <dd>
          When <em>enabled</em> (the default) the amount of time since a project was last built or the amount of time
          it has been building will be displayed on the Monitor page.
          <p>
            Please note the building time is <strong>not</strong> provided by the CCTray XML feed and is manually
            calculated by Nevergreen, this means it may not be entirely accurate.
          </p>
        </dd>
        <dt>Show build label</dt>
        <dd>
          When <em>enabled</em> the build label, for projects not building, will be displayed on the Monitor page.
          <p>
            The reason this is only shown for non building projects is because the CCTray XML is only updated after a
            project has finished building, meaning the value Nevergreen gets is always out of date for building
            projects.
          </p>
        </dd>
        <dt>Interesting projects</dt>
        <dd>
          This determines projects in what status to show on the Monitor page. By default this is sick, sick building,
          healthy building and unknown.
        </dd>
        <dt>Amount of projects to show</dt>
        <dd>
          This limits the total number of projects show on the Monitor page, any additional projects will be counted and
          shown in a summary box. The exact number of projects shown varies depending on the window size.
          <p>
            The main purpose of Nevergreen is to be an information radiator for the team, and this setting can be used
            to stop the view becoming too crowded to read at a distance.
          </p>
        </dd>
        <dt>Sort projects by</dt>
        <dd>
          This sets the sort order of projects on the Monitor page (projects on the Tracking page will always be in
          alphabetical order).
          <p>
            <em>default</em> applies no special sorting and uses the order the projects are returned in the CCTray XML
            feed, which may be server specific but generally seems to be based on activity.
          </p>
          <p>
            The timestamp for building projects is only updated after they have finished building, so sorting
            by <em>timestamp</em> may not display projects as expected. If that is the case the <em>default</em> sort
            order may be more appropriate.
          </p>
        </dd>
        <dt>Preview display</dt>
        <dd>
          This displays a Monitor page preview with a randomly generated number of projects and your currently selected
          settings.
        </dd>
      </dl>
      <p>
        Please note the feed identifier, build time and build labels will automatically be hidden, regardless of whether
        they are enabled, if the Monitor page becomes &quot;too crowded&quot;. This can happen if many projects are
        being shown on a small screen. This is done to make the project name larger and more visible, because this is
        the most important information to display. Reducing the number of projects
        shown {helpLink('max number of projects to show')} or increasing the size of the browser window can mitigate
        this.
      </p>
    </HelpArticle>
  )
}
