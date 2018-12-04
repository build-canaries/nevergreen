import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {IconButton} from '../common/IconButton'
import styles from './remove-link.scss'

export function RemoveLink({removeMessage, message, className}) {
  const classes = classNames(styles.removeLink, className)

  return (
    <IconButton icon='bin'
                label={`remove ${message}`}
                className={classes}
                onClick={removeMessage}/>
  )
}

RemoveLink.propTypes = {
  removeMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string
}
