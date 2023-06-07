import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../help/HelpArticle'
import { RoutePaths } from '../AppRoutes'

const keywords = ['monitor']

export function MonitorHelp({
  searchQuery,
  helpLink,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Monitor"
      page={RoutePaths.monitor}
    >
      <p>
        The Monitor page displays interesting projects once a CCTray XML feed
        has been added via the Tracking settings {helpLink('tracking')}.
      </p>
      <p>
        The Display settings contains various options that can change how the
        Monitor page looks and behaves {helpLink('display')}.
      </p>
      <p>
        If no interesting projects are being displayed then a random success
        message will be displayed {helpLink('success')}.
      </p>
    </HelpArticle>
  )
}
