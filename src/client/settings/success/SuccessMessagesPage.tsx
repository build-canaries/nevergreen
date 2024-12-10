import { ReactElement } from 'react'
import { isValidHttpUrl } from '../../domain/Url'
import { SuccessMessage } from '../../common/SuccessMessage'
import {
  getSuccessBackgroundColour,
  getSuccessMessages,
  getSuccessTextColour,
  removeMessage,
  setSuccessBackgroundColour,
  setSuccessTextColour,
} from './SuccessReducer'
import { WarningMessages } from '../../common/Messages'
import { Page } from '../../common/Page'
import { Image } from '../../common/icons/Image'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import { SuccessImage } from '../../common/SuccessImage'
import { useAspectRatio } from '../../common/AspectRatioHook'
import { Card } from '../../common/card/Card'
import { Bin } from '../../common/icons/Bin'
import { DangerButton } from '../../common/forms/Button'
import { AddLink } from '../AddLink'
import { ChangeColoursSection } from '../colours/ChangeColoursSection'
import { useAPCA } from '../colours/ContrastHook'
import isEmpty from 'lodash/isEmpty'
import styles from './success-messages-page.scss'

export const NO_MESSAGES_WARNING =
  'No success messages added, a blank screen will be shown on the Monitor page when no interesting projects are displayed'

function getWarnings(
  messages: ReadonlyArray<string>,
  isLowContrast: boolean,
): ReadonlyArray<string> {
  const warnings: Array<string> = []
  if (isEmpty(messages)) {
    warnings.push(NO_MESSAGES_WARNING)
  }
  if (isLowContrast) {
    warnings.push(
      'The chosen colours have a low perceptual lightness contrast. You should consider picking different colours to improve readability.',
    )
  }
  return warnings
}

export function SuccessMessagesPage(): ReactElement {
  const dispatch = useAppDispatch()
  const messages = useAppSelector(getSuccessMessages)
  const backgroundColour = useAppSelector(getSuccessBackgroundColour)
  const textColour = useAppSelector(getSuccessTextColour)
  const aspectRatio = useAspectRatio()

  const { lightnessContrast, isLowContrast } = useAPCA(
    textColour,
    backgroundColour,
  )

  const warnings = getWarnings(messages, isLowContrast)

  return (
    <Page title="Success messages" icon={<Image />}>
      <AddLink className={styles.addButton}>Add message</AddLink>
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
      <ChangeColoursSection
        text={textColour}
        setText={(val) => dispatch(setSuccessTextColour(val))}
        background={backgroundColour}
        setBackground={(val) => dispatch(setSuccessBackgroundColour(val))}
        lightnessContrast={lightnessContrast}
      />
      <WarningMessages messages={warnings} />
    </Page>
  )
}

export const Component = SuccessMessagesPage
