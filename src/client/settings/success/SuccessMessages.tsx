import type { ReactElement } from 'react'
import { useState } from 'react'
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
import { useWindowResized } from '../../common/ResizableHook'
import styles from './success-messages.scss'

export const NO_MESSAGES_WARNING =
  'No success messages added, a blank screen will be shown on the Monitor page when no interesting projects are displayed'

export function SuccessMessages(): ReactElement {
  const dispatch = useAppDispatch()
  const messages = useAppSelector(getSuccessMessages)
  const [aspectRatio, setAspectRatio] = useState(
    `${window.innerWidth} / ${window.innerHeight}`
  )

  useWindowResized(() =>
    setAspectRatio(`${window.innerWidth} / ${window.innerHeight}`)
  )

  const noMessagesWarning = notEmpty(messages) ? '' : NO_MESSAGES_WARNING

  return (
    <Page title="Success messages" icon={<Image />}>
      <AddButton className={styles.add}>Add message</AddButton>
      <WarningMessages messages={noMessagesWarning} />
      <ol className={styles.messages}>
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
              {isValidHttpUrl(msg) ? (
                <img
                  className={styles.message}
                  style={{ aspectRatio }}
                  src={msg}
                  alt={msg}
                  title={msg}
                  data-locator="success-image"
                />
              ) : (
                <div className={styles.message} style={{ aspectRatio }}>
                  <SuccessMessage message={msg} />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </Page>
  )
}
