import type { ReactElement } from 'react'
import styles from './skip-to-content.scss'
import { PrimaryButton } from './common/forms/Button'

export function SkipToContent(): ReactElement {
  return (
    <PrimaryButton
      onClick={() => {
        document.getElementsByTagName('h1').item(0)?.focus()
      }}
      className={styles.skipButton}
    >
      Skip to content
    </PrimaryButton>
  )
}
