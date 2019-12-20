import React from 'react'
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

export function TraySettingsHelp({searchQuery}: HelpProps) {
  return (
    <HelpArticle
      keywords={KEYWORDS}
      searchQuery={searchQuery}
      title='CI server specific settings'
      page='/tracking'>
      <p>
        Each CI server added has specific settings which can be changed via the <strong>settings</strong> tab.
      </p>
      <dl className={styles.helpSettings}>
        <dt>name</dt>
        <dd>
          A friendly name of the CI server used in various places instead of the URL. A random name is generated when
          a CI server is added, this can be removed if a name is not desired.
        </dd>
        <dt>URL</dt>
        <dd>The URL to the CCTray XML feed of the CI server.</dd>
        <dt>server type</dt>
        <dd>The server type can be set to enable some CI specific handling.</dd>
        <dt>auth</dt>
        <dd>The current auth mechanism of the CI server. Auth requires explicit changing as credentials need to be
          encrypted, plain text credentials are never saved locally.
        </dd>
        <dt>automatically include new projects</dt>
        <dd>
          When <em>enabled</em> (the default) any new projects added on the CI server will automatically be
          included for tracking. To remove a new project that has been automatically added, refreshing (see refresh) the
          CI server will make the project known to Nevergreen where it can be explicitly excluded by unchecking.
        </dd>
        <dt>delete</dt>
        <dd>Removes the CI server. Click with care as this can not be undone!</dd>
      </dl>
    </HelpArticle>
  )
}
