import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../help/HelpArticle'
import {ROUTE_MONITOR} from '../AppRoutes'

const keywords = [
  'monitor'
]

export function MonitorHelp({searchQuery, helpLink}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={keywords}
                 searchQuery={searchQuery}
                 title='Monitor'
                 page={ROUTE_MONITOR}>
      <p>
        The Monitor page displays interesting projects once a CCTray XML feed has been added via the Tracking
        page {helpLink('tracking')}.
      </p>
      <p>
        The Settings page contains various settings that can change how the Monitor page looks and
        behaves {helpLink('settings')}.
      </p>
      <p>
        If no interesting projects are being displayed then a random success message will be
        displayed {helpLink('success')}.
      </p>
    </HelpArticle>
  )
}
