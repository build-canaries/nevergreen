import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../help/HelpArticle'
import styles from '../help/help-article.scss'

const KEYWORDS = [
  'settings',
  'notifications',
  'desktop notifications',
  'show system notifications',
  'audio',
  'play audio notifications',
  'broken build sound'
]

export function NotificationSettingsHelp({searchQuery, helpLink}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='Notifications settings'
                 page='/settings'>
      <dl className={styles.helpSettings}>
        <dt>Show system notifications</dt>
        <dd>
          When <em>enabled</em> system (aka desktop) notifications will be shown when a project is sick or a sick
          project becomes healthy.
        </dd>
        <dt>Play audio notifications</dt>
        <dd>When <em>enabled</em> audio will be played when a project is sick.</dd>
        <dt>Broken build sound</dt>
        <dd>
          A URL to the sound file to play when a project is sick. This will only play if audio notifications are
          enabled {helpLink('play audio notifications')}.
        </dd>
      </dl>
    </HelpArticle>
  )
}
