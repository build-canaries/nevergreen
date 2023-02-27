import type { ReactElement } from 'react'
import { isValidHttpUrl } from '../../domain/Url'
import { SuccessMessage } from '../../common/SuccessMessage'
import { getSuccessMessages, removeMessage } from './SuccessReducer'
import { AddButton } from '../../common/LinkButton'
import { WarningMessages } from '../../common/Messages'
import { notEmpty } from '../../common/Utils'
import { Page } from '../../common/Page'
import { Image } from '../../common/icons/Image'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import { Bin } from '../../common/icons/Bin'
import { DangerButton } from '../../common/forms/Button'
import { SuccessColours } from './SuccessColours'
import { SuccessImage } from '../../common/SuccessImage'
import { useAspectRatio } from '../../common/AspectRationHook'
import styles from './success-messages.scss'

export const NO_MESSAGES_WARNING =
  'No success messages added, a blank screen will be shown on the Monitor page when no interesting projects are displayed'

export function SuccessMessages(): ReactElement {
  const dispatch = useAppDispatch()
  const messages = useAppSelector(getSuccessMessages)
  const aspectRatio = useAspectRatio()

  const noMessagesWarning = notEmpty(messages) ? '' : NO_MESSAGES_WARNING

  return (
    <Page title="Success messages" icon={<Image />}>
      <AddButton className={styles.add}>Add message</AddButton>
      <WarningMessages messages={noMessagesWarning} />
      <ol className={styles.messages} aria-label="messages">
        {messages.map((msg) => {
          return (
            <li key={msg} className={styles.messageItem}>
              <DangerButton
                icon={<Bin />}
                iconOnly
                className={styles.remove}
                onClick={() => dispatch(removeMessage(msg))}
              >
                remove success message
              </DangerButton>
              <div className={styles.messageContainer} style={{ aspectRatio }}>
                {isValidHttpUrl(msg) ? (
                  <SuccessImage url={msg} />
                ) : (
                  <SuccessMessage message={msg} />
                )}
              </div>
            </li>
          )
        })}
      </ol>
      <SuccessColours />
    </Page>
  )
}
