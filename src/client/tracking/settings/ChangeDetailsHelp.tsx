import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../help/HelpForms'
import {ROUTE_SETTINGS_TRACKING} from '../../Routes'

const KEYWORDS = [
  'tracking',
  'adding',
  'settings',
  'name',
  'url',
  'server type',
  'username',
  'password',
  'access token',
  'auth',
  'automatically include new projects'
]

export function ChangeDetailsHelp({searchQuery, helpLink}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={KEYWORDS}
      searchQuery={searchQuery}
      title='CCTray XML feed details'
      page={ROUTE_SETTINGS_TRACKING}>
      <p>
        Each CCTray XML feed added has specific settings which can be changed via the <strong>Settings</strong> tab.
      </p>
      <HelpForm>
        <HelpInput name='Name'>
          A friendly name of the CCTray XML feed used in various places instead of the URL. A random name is generated
          when a feed is added, this can be removed if a name is not desired.
        </HelpInput>
        <HelpInput name='URL'>
          The URL of the CCTray XML feed.
        </HelpInput>
        <HelpInput name='Auth'>
          The current auth mechanism of the CCTray XML feed. Since credentials are stored encrypted they can not be
          pre-populated and are changed separately from other feed details.
        </HelpInput>
        <HelpInput name='Server type'>
          The server type can be set to enable some server specific parsing. Only servers that require specific parsing
          are in the list. If your server is not specified and is displaying incorrect it may require some specific
          parsing. Please submit an issue telling us the server you are using and ideally an anonymised copy of the
          CCTray XML feed it produced.
        </HelpInput>
        <HelpInput name='Automatically include new projects'>
          When <em>enabled</em> (the default) any new projects returned by the CCTray XML feed will automatically be
          included for tracking. To remove a new project that has been automatically added,
          refreshing {helpLink('refresh')} the CCTray XML feed will make the project known to Nevergreen where it
          can be explicitly excluded by unchecking.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
