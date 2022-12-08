import React, { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { ROUTE_NOTIFICATIONS_ADD } from '../../AppRoutes'

const keywords = [
  'settings',
  'notifications',
  'desktop notifications',
  'show system notifications',
  'audio',
  'play audio notifications',
]

export function AddNotificationHelp({
  searchQuery,
  helpLink,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Add notification"
      page={ROUTE_NOTIFICATIONS_ADD}
    >
      <p>
        To actually show or play notification they need to be allowed{' '}
        {helpLink('allow')}. Notifications can still be added even if neither
        are allowed. This allows system and/or audio notifications to be
        temporarily stopped without needed to deleted added notifications.
      </p>
      <HelpForm>
        <HelpInput name="When transitioning to">
          Notify when a project first transitions to this status.
          <p>
            Adding a new notification for a status will override any existing
            notification for the given status.
          </p>
        </HelpInput>
        <HelpInput name="Show system notification">
          When <em>enabled</em> a system (aka desktop) notifications will be
          shown.
        </HelpInput>
        <HelpInput name="Play audio">
          When set to a audio URL it will be played. It is recommended to use
          short sound effects for notifications.
        </HelpInput>
        <HelpInput name="Play">
          Plays the inputted audio file URL. Displays a validation message if
          the URL can not be played as for any reason. Adding a notification
          does not check the URL points to a valid playable audio file, so it is
          recommended to manually test before adding the notification.
        </HelpInput>
        <HelpInput name="Stop">Stops the playing audio.</HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
