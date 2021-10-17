import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../help/HelpForms'
import {ROUTE_SETTINGS_GENERAL} from '../../Routes'

const KEYWORDS = [
  'settings',
  'general',
  'click to show menu'
]

export function GeneralSettingsHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='General settings'
                 page={ROUTE_SETTINGS_GENERAL}>
      <HelpForm>
        <HelpInput name='Click to show menu'>
          While <em>disabled</em> (the default) moving the mouse on the Monitor page will show the menu.
          While <em>enabled</em> you will need to click while on the Monitor page to show the menu.
          <p>
            The main reason to enable is if you are using tab rotation in your browser. Otherwise every time the browser
            rotates to the Nevergreen tab, a mouse move will be triggered and the menu will be shown.
            Regardless of whether this is enabled keyboard shortcuts can be used to navigate between all pages.
          </p>
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
