import React from 'react'
import PropTypes from 'prop-types'
import {DangerButton} from '../common/forms/Button'
import styles from './remove-button.scss'
import {iBin} from '../common/fonts/Icons'

export function RemoveButton({removeMessage}) {
  return (
    <DangerButton icon={iBin}
                  iconOnly
                  type='danger'
                  className={styles.remove}
                  onClick={removeMessage}>
      remove success message
    </DangerButton>
  )
}

RemoveButton.propTypes = {
  removeMessage: PropTypes.func.isRequired
}
