import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { ROUTE_DISPLAY } from '../../AppRoutes'
import { Eye } from '../../common/icons/Eye'
import { PaintFormat } from '../../common/icons/PaintFormat'

const keywords = [
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
  'preview display',
]

export function DisplaySettingsHelp({
  searchQuery,
  helpLink,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Display settings"
      page={ROUTE_DISPLAY}
    >
      <HelpForm>
        <HelpInput name="Preview display" icon={<Eye />}>
          This displays a Monitor page preview with some preset fake projects
          and your currently selected settings.
        </HelpInput>
        <HelpInput name="Show feed identifier">
          When <em>enabled</em> the feed name {helpLink('name')} or URL will be
          displayed on the Monitor page.
        </HelpInput>
        <HelpInput name="Show build time">
          When <em>enabled</em> (the default) the amount of time since a project
          was last built or the amount of time it has been building will be
          displayed on the Monitor page.
          <p>
            Please note the building time is <strong>not</strong> provided by
            the CCTray XML feed and is manually calculated by Nevergreen, this
            means it may not be entirely accurate.
          </p>
        </HelpInput>
        <HelpInput name="Show build label">
          When <em>enabled</em> the build label, for projects not building, will
          be displayed on the Monitor page.
          <p>
            The reason this is only shown for non building projects is because
            the CCTray XML is only updated after a project has finished
            building, meaning the value Nevergreen gets is always out of date
            for building projects.
          </p>
        </HelpInput>
        <HelpInput name="Amount of projects to show">
          This limits the total number of projects show on the Monitor page, any
          additional projects will be counted and shown in a summary box. The
          exact number of projects shown varies depending on the window size.
          <p>
            The main purpose of Nevergreen is to be an information radiator for
            the team, and this setting can be used to stop the view becoming too
            crowded to read at a distance.
          </p>
        </HelpInput>
        <HelpInput name="Sort projects by">
          This sets the sort order of projects on the Monitor page (projects on
          the Manage projects page will always be in alphabetical order).
          <p>
            <em>default</em> applies no special sorting and uses the order the
            projects are returned in the CCTray XML feed, which may be server
            specific but generally seems to be based on activity.
          </p>
          <p>
            The timestamp for building projects is only updated after they have
            finished building, so sorting by <em>timestamp</em> may not display
            projects as expected. If that is the case the <em>default</em> sort
            order may be more appropriate.
          </p>
        </HelpInput>
        <HelpInput name="Show on the Monitor page">
          When <em>enabled</em> the corresponding prognosis will be displayed on
          the Monitor page. Errors are always shown and can not be removed.
        </HelpInput>
        <HelpInput name="Change colours" icon={<PaintFormat />}>
          Allows changing of the background and text colour of the corresponding
          prognosis.
        </HelpInput>
      </HelpForm>
      <p>
        Please note the feed identifier, build time and build labels will
        automatically be hidden, regardless of whether they are enabled, if the
        Monitor page becomes &quot;too crowded&quot;. This can happen if many
        projects are being shown on a small screen. This is done to make the
        project name larger and more visible, because this is the most important
        information. Reducing the number of projects shown{' '}
        {helpLink('amount of projects to show')} or increasing the size of the
        browser window can mitigate this.
      </p>
    </HelpArticle>
  )
}
