import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Container} from '../common/Container'
import {RemoveLink} from './RemoveLink'
import styles from './added-messages.scss'

export function AddedMessages({messages, removeMessage}) {
  if (_.isEmpty(messages)) {
    return null
  }

  return (
    <Container title='Messages'>
      <ol className={styles.successMessages}>
        {
          messages.map((message) => {
            const remove = () => removeMessage(message)

            return (
              <li key={message}
                  className={styles.successItem}>
                <RemoveLink removeMessage={remove}/>
                <div className={styles.message}
                     data-locator='success-message'>
                  {message}
                </div>
              </li>
            )
          })
        }
      </ol>
    </Container>
  )
}

AddedMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired
}
