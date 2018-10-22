import React from 'react'
import PropTypes from 'prop-types'
import {Container} from '../common/container/Container'
import {RemoveLink} from './RemoveLink'
import styles from './added-messages.scss'
import _ from 'lodash'

export function AddedMessages({messages, removeMessage}) {
  if (_.isEmpty(messages)) {
    return null
  }

  return (
    <Container title='Messages'>
      <ol className={styles.successMessages}>
        {
          messages.map((message, index) => {
            const remove = () => removeMessage(message)

            return (
              <li key={message} className={styles.successItem}>
                <RemoveLink hotkeys={[`y m ${index}`]}
                            removeMessage={remove}
                            message={message}/>
                <div className={styles.message} data-locator='success-message'>
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
