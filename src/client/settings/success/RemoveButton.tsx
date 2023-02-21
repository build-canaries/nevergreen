import type { ReactElement } from 'react'
import { DangerButton } from '../../common/forms/Button'
import { Bin } from '../../common/icons/Bin'
import styles from './remove-button.scss'

interface RemoveButtonProps {
  readonly removeMessage: () => void
}

export function RemoveButton({
  removeMessage,
}: RemoveButtonProps): ReactElement {
  return (
    <DangerButton
      icon={<Bin />}
      iconOnly
      className={styles.remove}
      onClick={removeMessage}
    >
      remove success message
    </DangerButton>
  )
}
