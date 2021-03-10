import React, {ReactElement, ReactNode} from 'react'
import {Container} from '../../common/Container'
import {RemoveButton} from './RemoveButton'
import {isValidHttpUrl} from '../../domain/Url'
import {SuccessMessage} from '../../common/SuccessMessage'
import {useDispatch, useSelector} from 'react-redux'
import {getSuccessMessages} from './SuccessReducer'
import {removeMessage} from './SuccessActionCreators'
import styles from './success-messages.scss'
import {LinkButton} from '../../common/LinkButton'
import {ROUTE_SUCCESS_ADD} from '../../Routes'
import {WarningMessages} from '../../common/Messages'
import {notEmpty} from '../../common/Utils'

export const NO_MESSAGES_WARNING = 'No success messages added, a blank screen will be shown on the Monitor page when no interesting projects are displayed'

function AspectRatio({children}: { children: ReactNode }): ReactElement {
  return (
    <li className={styles.messageItem}>
      <div className={styles.messageWrapper}>
        {children}
      </div>
    </li>
  )
}

export function SuccessMessages(): ReactElement {
  const dispatch = useDispatch()
  const messages = useSelector(getSuccessMessages)

  const noMessagesWarning = notEmpty(messages)
    ? ''
    : NO_MESSAGES_WARNING

  return (
    <Container title='Success messages'>
      <WarningMessages messages={noMessagesWarning}
                       className={styles.warning}/>
      <ol className={styles.messages}
          id='success'>
        {
          messages.map((msg) => {
            return (
              <AspectRatio key={msg}>
                {isValidHttpUrl(msg) ? (
                  <img className={styles.message}
                       src={msg}
                       alt={msg}
                       title={msg}
                       data-locator='success-image'/>
                ) : (
                  <div className={styles.message}>
                    <SuccessMessage message={msg}/>
                  </div>
                )}
                <RemoveButton removeMessage={() => dispatch(removeMessage(msg))}/>
              </AspectRatio>
            )
          })
        }
        <li className={styles.addNew}>
          <LinkButton to={ROUTE_SUCCESS_ADD}
                      className={styles.addNewButton}>
            Add message
          </LinkButton>
        </li>
      </ol>
    </Container>
  )
}
