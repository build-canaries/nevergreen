import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { ExternalLink } from '../../common/ExternalLink'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { InfoMessages } from '../../common/Messages'
import { RoutePaths } from '../../AppRoutes'
import { Loop } from '../../common/icons/Loop'

const keywords = [
  'tracking',
  'adding',
  'cctray',
  'xml',
  'url',
  'username',
  'password',
  'access token',
  'auth',
  'getting started',
]

export function AddFeedHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      title="Adding a CCTray XML feed"
      keywords={keywords}
      searchQuery={searchQuery}
      page={RoutePaths.trackingAdd}
    >
      <HelpForm>
        <HelpInput name="URL">
          This needs to point directly to the CCTray XML feed.
        </HelpInput>
        <HelpInput name="Authentication">
          <dl>
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
        <HelpInput name="Username">
          The username to send when using basic auth. Only shown if basic auth
          is selected.
        </HelpInput>
        <HelpInput name="Password">
          The password to send when using basic auth. Only shown if basic auth
          is selected.
        </HelpInput>
        <HelpInput name="Token">
          The token to send when using access token auth. Only shown if access
          token authentication is selected.
        </HelpInput>
        <HelpInput name="Check connection" icon={<Loop />}>
          This will check the currently entered details and display a message
          whether the connection was successful or not.
        </HelpInput>
      </HelpForm>
      <InfoMessages messages="Passwords and tokens get encrypted by the Nevergreen server and are never stored in plain text in your browser." />
      <p>
        Multiple CCTray XML feeds can be tracked,{' '}
        <ExternalLink href="https://www.thoughtworks.com/radar/techniques/a-single-ci-instance-for-all-teams">
          allowing you to track other teams projects
        </ExternalLink>
        .
      </p>
    </HelpArticle>
  )
}

export function CCTrayLocationsHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      title="CCTray XML feed location"
      keywords={[
        'tracking',
        'adding',
        'cctray',
        'xml',
        'url',
        'location',
        'find',
        'feed',
      ]}
      searchQuery={searchQuery}
      page={RoutePaths.trackingAdd}
    >
      See the{' '}
      <ExternalLink href="https://cctray.org/servers/">
        CCTray specification servers page
      </ExternalLink>{' '}
      for information about finding the CCTray XML feed for your server.
    </HelpArticle>
  )
}
