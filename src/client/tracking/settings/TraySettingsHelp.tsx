import React, {ReactElement} from 'react'
import styles from '../../help/help-article.scss'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'

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
  'automatically include new projects',
  'delete'
]

export function TraySettingsHelp({searchQuery, helpLink}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={KEYWORDS}
      searchQuery={searchQuery}
      title='CCTray XML feed specific settings'
      page='/tracking'>
      <p>
        Each CCTray XML feed added has specific settings which can be changed via the <strong>Settings</strong> tab.
      </p>
      <dl className={styles.helpSettings}>
        <dt>Name</dt>
        <dd>
          A friendly name of the CCTray XML feed used in various places instead of the URL. A random name is generated
          when a feed is added, this can be removed if a name is not desired.
        </dd>
        <dt>URL</dt>
        <dd>The URL of the CCTray XML feed.</dd>
        <dt>Server type</dt>
        <dd>
          The server type can be set to enable some server specific parsing. Only servers that require specific parsing
          are in the list. If your server is not specified and is displaying incorrect it may require some specific
          parsing. Please submit an issue telling us the server you are using and ideally an anonymised copy of the
          CCTray XML feed it produced.
        </dd>
        <dt>Auth</dt>
        <dd>
          The current auth mechanism of the CCTray XML feed. Auth requires explicit changing as credentials need to be
          encrypted, plain text credentials are never saved locally.
        </dd>
        <dt>Automatically include new projects</dt>
        <dd>
          When <em>enabled</em> (the default) any new projects returned by the CCTray XML feed will automatically be
          included for tracking. To remove a new project that has been automatically added, refreshing
          {helpLink('refresh')} the CCTray XML feed will make the project known to Nevergreen where it can be
          explicitly excluded by unchecking.
        </dd>
        <dt>Delete feed</dt>
        <dd>Removes the CCTray XML feed. Click with care as this can not be undone!</dd>
      </dl>
    </HelpArticle>
  )
}
