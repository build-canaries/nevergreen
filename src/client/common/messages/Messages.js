import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './messages.scss'

class Messages extends Component {
  render() {
    if (_.isEmpty(this.props.messages)) {
      return null
    }

    const isError = this.props.type === 'error'
    const classes = classNames(styles.messages, styles[this.props.type], this.props.className)

    return (
      <ul className={classes} data-locator='messages' aria-live={isError ? 'alert' : 'polite'}>
        {
          this.props.messages.map((msg) => {
            return <li key={msg} className={styles.message}>{msg}</li>
          })
        }
      </ul>
    )
  }
}

Messages.propTypes = {
  type: PropTypes.oneOf(['info', 'error']).isRequired,
  messages: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
}

export default Messages
