import React, { ReactElement } from 'react'
import styles from './refresh.scss'
import { PrimaryButton } from '../../../common/forms/Button'
import { Loop } from '../../../common/icons/Loop'

interface RefreshProps {
  readonly refreshTray: () => void
  readonly loaded: boolean
}

export function Refresh({ refreshTray, loaded }: RefreshProps): ReactElement {
  return (
    <PrimaryButton
      className={styles.refresh}
      onClick={refreshTray}
      icon={<Loop loaded={loaded} />}
      disabled={!loaded}
    >
      Refresh
    </PrimaryButton>
  )
}
