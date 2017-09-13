import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import RemoveLink from './RemoveLink'
import styles from './added-messages.scss'
import _ from 'lodash'

class AddedMessages extends Component {
  render() {
    if (_.isEmpty(this.props.messages)) {
      return null
    }

    return (
      <Container title='messages'>
        <ol className={styles.successMessages}>
          {
            this.props.messages.map((message, index) => {
              const remove = () => this.props.removeMessage(message)

              return (
                <li key={`m${index}`} className={styles.successItem}>
                  <RemoveLink hotkeys={[`y m ${index}`]} removeMessage={remove} message={message}/>
                  <span className={styles.message} data-locator='success-message'>{message}</span>
                </li>
              )
            })
          }
        </ol>
      </Container>
    )
  }
}

AddedMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default AddedMessages
