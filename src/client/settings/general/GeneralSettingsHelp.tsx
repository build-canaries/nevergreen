import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../help/HelpForms'
import {ROUTE_SETTINGS_GENERAL} from '../../Routes'

const KEYWORDS = [
  'settings',
  'general',
  'poll for feed changes every',
  'click to show menu',
  'check for new nevergreen versions'
]

export function GeneralSettingsHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='General settings'
                 page={ROUTE_SETTINGS_GENERAL}>
      <HelpForm>
        <HelpInput name='Poll for feed changes every'>
          How often to check the CI server for project updates.
        </HelpInput>
        <HelpInput name='Click to show menu'>
          While <em>disabled</em> (the default) moving the mouse on the Monitor page will show the menu.
          While <em>enabled</em> you will need to click while on the Monitor page to show the menu.
          <p>
            The main reason to enable is if you are using tab rotation in your browser. Otherwise every time the browser
            rotates to the Nevergreen tab, a mouse move will be triggered and the menu will be shown.
            Regardless of whether this is enabled keyboard shortcuts can be used to navigate between all pages.
          </p>
        </HelpInput>
        <HelpInput name='Check for new Nevergreen versions'>
          When <em>enabled</em> (the default) Nevergreen will check (every 24 hours) for a new version and display a
          notification if one is available.
          <p>
            Please note regardless of this settings, if the Nevergreen server has been updated you will always get a
            notification to update. This is because you need to update the client (by refreshing) to make sure it is
            the correct version in relation to the server.
          </p>
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
