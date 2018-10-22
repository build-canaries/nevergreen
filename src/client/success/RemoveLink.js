import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Shortcut} from '../common/Shortcut'
import styles from './remove-link.scss'

export function RemoveLink({hotkeys, removeMessage, message, className}) {
  const classes = classNames(styles.removeLink, className)

  return (
    <button className={classes}
            onClick={removeMessage}
            title={`remove ${message}`}>
      <div>remove {message}</div>
      <Shortcut hotkeys={hotkeys}/>
    </button>
  )
}

RemoveLink.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string
}
