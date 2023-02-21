import type { ReactElement } from 'react'
import { PrimaryButton } from '../../../common/forms/Button'
import { Loop } from '../../../common/icons/Loop'
import styles from './refresh.scss'

interface RefreshProps {
  readonly refreshTray: () => void
  readonly isLoading: boolean
}

export function Refresh({
  refreshTray,
  isLoading,
}: RefreshProps): ReactElement {
  return (
    <PrimaryButton
      className={styles.refresh}
      onClick={refreshTray}
      icon={<Loop isLoading={isLoading} />}
      disabled={isLoading}
    >
      Refresh
    </PrimaryButton>
  )
}
