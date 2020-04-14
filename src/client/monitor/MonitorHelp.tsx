import React from 'react'
import {HelpArticle, HelpProps} from '../help/HelpArticle'

const KEYWORDS = [
  'monitor'
]

export function MonitorHelp({searchQuery, helpLink}: HelpProps) {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='Monitor'
                 page='/monitor'>
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
