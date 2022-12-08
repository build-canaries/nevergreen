import React, { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { ROUTE_NOTIFICATIONS } from '../../AppRoutes'

const keywords = [
  'settings',
  'notifications',
  'desktop notifications',
  'check for new nevergreen versions',
  'allow system notifications',
  'audio',
  'allow audio notifications',
]

export function NotificationSettingsHelp({
  searchQuery,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Notifications settings"
      page={ROUTE_NOTIFICATIONS}
    >
      <HelpForm>
        <HelpInput name="Check for new Nevergreen versions">
          When <em>enabled</em> (the default) Nevergreen will check (every 24
          hours) for a new version and display a banner if one is available.
          <p>
            Please note regardless of this settings, if the Nevergreen server
            has been updated you will always get a banner. This is because you
            need to update the client (by refreshing) to make sure it is the
            correct version in relation to the server.
          </p>
        </HelpInput>
        <HelpInput name="Allow system notifications">
          When <em>enabled</em> any added system (aka desktop) notifications can
          be shown. This is a personal setting that won&apos;t get exported or
          changed via an import.
        </HelpInput>
        <HelpInput name="Allow audio notifications">
          When <em>enabled</em> any added audio notifications can be played.
        </HelpInput>
        <HelpInput name="Add notification">Adds a new notification.</HelpInput>
      </HelpForm>
      <p>Added notifications will appear and can be managed from this page.</p>
      <HelpForm>
        <HelpInput name="Remove notification">
          Removes the given notification. Notifications can be re-added at any
          time.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
