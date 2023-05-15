import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../../help/HelpForms'
import { ROUTE_TRACKING_DETAILS_CONNECTION } from '../../../AppRoutes'
import { Loop } from '../../../common/icons/Loop'

const keywords = [
  'tracking',
  'settings',
  'url',
  'server type',
  'username',
  'password',
  'access token',
  'auth',
]

export function UpdateConnectionHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Update connection"
      page={ROUTE_TRACKING_DETAILS_CONNECTION}
    >
      <HelpForm>
        <HelpInput name="URL">The URL of the CCTray XML feed.</HelpInput>
        <HelpInput name="Authentication">
          <dl>
            <dt>Keep existing auth</dt>
            <dd>
              Since credentials are stored encrypted they can not be
              pre-populated, this option makes it possible to update the URL
              without being forced to re-enter the auth details.
            </dd>
            <dt>No auth</dt>
            <dd>
              Select this if access to the feed is not authenticated in any way.
              No <em>Authorization</em> header will be sent with the request.
            </dd>
            <dt>Basic auth</dt>
            <dd>
              Select this if access to the feed is protected by basic auth. The
              entered username and password will be sent in the{' '}
              <em>Authorization</em> header using the <em>Basic</em> scheme.
            </dd>
            <dt>Access token</dt>
            <dd>
              Select this if access to the feed is protected by an access token.
              The entered token will be sent in the <em>Authorization</em>{' '}
              header using the <em>Bearer</em> scheme.
            </dd>
          </dl>
        </HelpInput>
        <HelpInput name="Check connection" icon={<Loop />}>
          This will check the currently entered details and display a message
          whether the connection was successful or not.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
