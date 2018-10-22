import React from 'react'
import PropTypes from 'prop-types'
import {ScaledGrid} from '../common/scale/ScaledGrid'
import styles from './success-message.scss'

export function SuccessMessage({message}) {
  return (
    <ScaledGrid>
      <div className={styles.successMessage}>
        <div className={styles.message}>{message}</div>
      </div>
    </ScaledGrid>
  )
}

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired
}
