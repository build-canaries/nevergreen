import React, {ReactElement} from 'react'
import {DangerButton} from '../../common/forms/Button'
import styles from './remove-button.scss'
import {Bin} from '../../common/icons/Bin'

interface RemoveButtonProps {
  readonly removeMessage: () => void;
}

export function RemoveButton({removeMessage}: RemoveButtonProps): ReactElement {
  return (
    <DangerButton icon={<Bin/>}
                  iconOnly
                  className={styles.remove}
                  onClick={removeMessage}>
      remove success message
    </DangerButton>
  )
}
