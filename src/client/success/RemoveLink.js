import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {DangerButton} from '../common/forms/Button'
import styles from './remove-link.scss'

export function RemoveLink({removeMessage, className}) {
  const classes = classNames(styles.removeLink, className)

  return (
    <DangerButton icon='bin'
                  iconOnly
                  type='danger'
                  className={classes}
                  onClick={removeMessage}>
      remove success message
    </DangerButton>
  )
}

RemoveLink.propTypes = {
  removeMessage: PropTypes.func.isRequired,
  className: PropTypes.string
}
