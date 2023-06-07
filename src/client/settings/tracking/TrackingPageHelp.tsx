import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { RoutePaths } from '../../AppRoutes'
import { Plus } from '../../common/icons/Plus'
import { Cog } from '../../common/icons/Cog'
import { CheckboxChecked } from '../../common/icons/CheckboxChecked'
import { Bin } from '../../common/icons/Bin'

const keywords = ['tracking', 'adding', 'cctray', 'xml', 'getting started']

export function TrackingPageHelp({
  searchQuery,
  helpLink,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      title="Tracking"
      keywords={keywords}
      searchQuery={searchQuery}
      page={RoutePaths.tracking}
    >
      <HelpForm>
        <HelpInput name="Poll for feed changes every">
          How often to check the CCTray XML feed(s) for project updates.
        </HelpInput>
        <HelpInput name="Add feed" icon={<Plus />}>
          Adds a new CCTray XML feed.
        </HelpInput>
      </HelpForm>
      <p>
        Added CCTray XML feeds will appear and can be managed from this page.
      </p>
      <HelpForm>
        <HelpInput name="Manage projects" icon={<CheckboxChecked />}>
          This allows you to select interesting projects to display on the
          Monitor page.
        </HelpInput>
        <HelpInput name="Update details" icon={<Cog />}>
          This allows you to update details for the CCTray XML feed, such as the
          URL or name.
        </HelpInput>
        <HelpInput name="Remove" icon={<Bin />}>
          This will permanently delete the CCTray XML feed. Feeds can be
          re-added at any time and you can also make a backup before removing{' '}
          {helpLink('backup')}.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
