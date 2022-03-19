import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../help/HelpForms'
import {ROUTE_NOTIFICATIONS} from '../../AppRoutes'

const keywords = [
  'settings',
  'notifications',
  'desktop notifications',
  'check for new nevergreen versions',
  'show system notifications',
  'audio',
  'play audio notifications',
  'broken build sound'
]

export function NotificationSettingsHelp({searchQuery, helpLink}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={keywords}
                 searchQuery={searchQuery}
                 title='Notifications settings'
                 page={ROUTE_NOTIFICATIONS}>
      <HelpForm>
        <HelpInput name='Check for new Nevergreen versions'>
          When <em>enabled</em> (the default) Nevergreen will check (every 24 hours) for a new version and display a
          notification if one is available.
          <p>
            Please note regardless of this settings, if the Nevergreen server has been updated you will always get a
            notification to update. This is because you need to update the client (by refreshing) to make sure it is
            the correct version in relation to the server.
          </p>
        </HelpInput>
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
