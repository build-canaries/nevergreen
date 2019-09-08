import React from 'react'
import _ from 'lodash'
import {Container} from '../common/Container'
import {RemoveButton} from './RemoveButton'
import styles from './added-messages.scss'
import {hasScheme} from '../domain/Url'
import {SuccessMessage} from '../common/SuccessMessage'

interface AddedMessagesProps {
  readonly messages: ReadonlyArray<string>;
  readonly removeMessage: (message: string) => void;
}

export function AddedMessages({messages, removeMessage}: AddedMessagesProps) {
  if (_.isEmpty(messages)) {
    return null
  }

  return (
    <Container title='Messages' className={styles.container}>
      <ol className={styles.messages}>
        {
          messages.map((msg) => {
            const remove = () => removeMessage(msg)

            return (
              <li key={msg} className={styles.messageItem}>
                <div className={styles.messageWrapper}>
                  {hasScheme(msg) ? (
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
                </div>
                <RemoveButton removeMessage={remove}/>
              </li>
            )
          })
        }
      </ol>
    </Container>
  )
}
