import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { RoutePaths } from '../../AppRoutes'
import { Plus } from '../../common/icons/Plus'
import { Cog } from '../../common/icons/Cog'
import { CheckboxChecked } from '../../common/icons/CheckboxChecked'
import { Bin } from '../../common/icons/Bin'

const keywords = ['tracking', 'adding', 'cctray', 'xml', 'getting started']

export function TrackingPageHelp({ searchQuery }: HelpProps): ReactElement {
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
        <HelpInput name="Update connection" icon={<Cog />}>
          This allows you to update connection details for the CCTray XML feed.
        </HelpInput>
        <HelpInput name="Manage projects" icon={<CheckboxChecked />}>
          This allows you to select interesting projects to display on the
          Monitor page.
        </HelpInput>
        <HelpInput name="Update details" icon={<Cog />}>
          This allows you to update other details for the CCTray XML feed.
        </HelpInput>
        <HelpInput name="Remove" icon={<Bin />}>
          This will permanently delete the CCTray XML feed. Feeds can be
          re-added at any time.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
