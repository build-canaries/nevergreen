import React from 'react'
import {HelpArticle, HelpProps} from '../help/HelpArticle'
import styles from '../help/help-article.scss'

const KEYWORDS = [
  'settings',
  'general',
  'poll for CI changes every',
  'click to show menu'
]

export function GeneralSettingsHelp({searchQuery}: HelpProps) {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='General settings'
                 page='/settings'>
      <dl className={styles.helpSettings}>
        <dt>poll for CI changes every</dt>
        <dd>How often to check the CI server for project updates.</dd>
        <dt>click to show menu</dt>
        <dd>
          While <em>disabled</em> (the default) moving the mouse on the Monitor page will show the menu.
          While <em>enabled</em> you will need to click while on the Monitor page to show the menu.
          <p>
            The main reason to enable is if you are using some kind of tab rotation in your browser. Otherwise every
            time the browser rotates to the Nevergreen tab, a mouse move will be triggered and the menu will be shown.
            Regardless of whether this is enabled keyboard shortcuts can be used to navigate between all pages.
          </p>
        </dd>
      </dl>
    </HelpArticle>
  )
}
