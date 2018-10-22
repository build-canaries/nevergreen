import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './messages.scss'

export function Messages({messages, type, className}) {
  if (_.isEmpty(messages)) {
    return null
  }

  const isError = type === 'error'
  const classes = classNames(styles[type], className)

  return (
    <ul className={classes}
        data-locator={`${type}-messages`}
        aria-live={isError ? 'assertive' : 'polite'}>
      {
        messages.map((msg) => {
          return <li key={msg} className={styles.message}>{msg}</li>
        })
      }
    </ul>
  )
}

Messages.propTypes = {
  type: PropTypes.oneOf(['info', 'error']).isRequired,
  messages: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
}
