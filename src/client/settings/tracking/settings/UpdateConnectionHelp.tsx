import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../../help/HelpArticle'
import { HelpForm } from '../../../help/HelpForms'
import { RoutePaths } from '../../../AppRoutes'
import {
  ConnectionFormHelp,
  keywords as connectionKeywords,
} from '../ConnectionFormHelp'

const keywords = ['tracking', 'settings', ...connectionKeywords]

export function UpdateConnectionHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Update connection"
      page={RoutePaths.trackingConnection}
    >
      <HelpForm>
        <ConnectionFormHelp />
      </HelpForm>
    </HelpArticle>
  )
}
