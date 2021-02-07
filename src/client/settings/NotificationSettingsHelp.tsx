import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../help/HelpArticle'
import {HelpForm, HelpInput} from '../help/HelpForms'

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
      <HelpForm>
        <HelpInput name='Show system notifications'>
          When <em>enabled</em> system (aka desktop) notifications will be shown when a project is sick or a sick
          project becomes healthy. This is a personal setting that won&apos;t get exported or changed via an import.
        </HelpInput>
        <HelpInput name='Play audio notifications'>
          When <em>enabled</em> audio will be played when a project is sick.
        </HelpInput>
        <HelpInput name='Broken build sound'>
          A URL to the sound file to play when a project is sick. This will only play if audio notifications are
          enabled {helpLink('play audio notifications')}.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
