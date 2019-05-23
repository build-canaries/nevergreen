import React from 'react'
import {DangerButton} from '../common/forms/Button'
import styles from './remove-button.scss'
import {iBin} from '../common/fonts/Icons'

interface RemoveButtonProps {
  removeMessage: () => void;
}

export function RemoveButton({removeMessage}: RemoveButtonProps) {
  return (
    <DangerButton icon={iBin}
                  iconOnly
                  className={styles.remove}
                  onClick={removeMessage}>
      remove success message
    </DangerButton>
  )
}
