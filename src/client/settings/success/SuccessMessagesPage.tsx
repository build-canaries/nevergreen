import type { ReactElement } from 'react'
import { isValidHttpUrl } from '../../domain/Url'
import { SuccessMessage } from '../../common/SuccessMessage'
import { getSuccessMessages, removeMessage } from './SuccessReducer'
import { WarningMessages } from '../../common/Messages'
import { notEmpty } from '../../common/Utils'
import { Page } from '../../common/Page'
import { Image } from '../../common/icons/Image'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import { SuccessImage } from '../../common/SuccessImage'
import { useAspectRatio } from '../../common/AspectRatioHook'
import { Card } from '../../common/card/Card'
import { ChangeColoursLink } from '../colours/ChangeColoursLink'
import { Bin } from '../../common/icons/Bin'
import { DangerButton } from '../../common/forms/Button'
import { AddLink } from '../AddLink'
import styles from './success-messages-page.scss'

export const NO_MESSAGES_WARNING =
  'No success messages added, a blank screen will be shown on the Monitor page when no interesting projects are displayed'

export function SuccessMessagesPage(): ReactElement {
  const dispatch = useAppDispatch()
  const messages = useAppSelector(getSuccessMessages)
  const aspectRatio = useAspectRatio()

  const noMessagesWarning = notEmpty(messages) ? '' : NO_MESSAGES_WARNING

  return (
    <Page title="Success messages" icon={<Image />}>
      <ChangeColoursLink className={styles.changeColours} path="success" />
      <AddLink>Add message</AddLink>
      <WarningMessages messages={noMessagesWarning} />
      <ol className={styles.messages} aria-label="messages">
        {messages.map((msg) => {
          const header = (
            <DangerButton
              onClick={() => dispatch(removeMessage(msg))}
              icon={<Bin />}
              iconOnly
              className={styles.remove}
            >
              Remove {msg}
            </DangerButton>
          )

          return (
            <li key={msg}>
              <Card
                header={header}
                className={styles.card}
                classNameHeader={styles.cardHeader}
                classNameBody={styles.cardBody}
              >
                <div style={{ aspectRatio }}>
                  {isValidHttpUrl(msg) ? (
                    <SuccessImage url={msg} />
                  ) : (
                    <SuccessMessage message={msg} />
                  )}
                </div>
              </Card>
            </li>
          )
        })}
      </ol>
    </Page>
  )
}

export const Component = SuccessMessagesPage
