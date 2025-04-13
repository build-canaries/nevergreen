import type { ReactElement } from 'react'
import { ExternalLink } from './common/ExternalLink'
import { SecondaryButton } from './common/forms/Button'
import { clear } from './configuration/LocalRepository'
import { ErrorMessages } from './common/Messages'
import { Bin } from './common/icons/Bin'
import styles from './unhandled-error-message.scss'

const developerToolsLink =
  'https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools#find_out_more_3'
const issueLink = 'https://github.com/build-canaries/nevergreen/issues'

export function UnhandledErrorMessage(): ReactElement {
  const deleteAndReload = async () => {
    await clear()
    window.location.reload()
  }

  return (
    <div className={styles.content}>
      <h1>Something went wrong.</h1>
      <p>Please try refreshing the page.</p>
      <ErrorMessages
        messages={[
          <span key="1">
            Your{' '}
            <ExternalLink href={developerToolsLink}>
              browser developer tools
            </ExternalLink>{' '}
            may provide more information about the error. If so, you can{' '}
            <ExternalLink href={issueLink}>
              report bugs to us on GitHub
            </ExternalLink>
            .
          </span>,
          <span key="2">
            If you continue to see this page after refreshing, you may need to
            delete your Nevergreen configuration.{' '}
          </span>,
          <strong key="3">
            Please note, deleting your configuration can not be undone!
          </strong>,
        ]}
      />
      <SecondaryButton
        icon={<Bin />}
        className={styles.deleteConfiguration}
        onClick={() => void deleteAndReload()}
      >
        Delete configuration and reload
      </SecondaryButton>
    </div>
  )
}
