import type { ReactElement, ReactNode } from 'react'
import styles from './main.scss'

interface MainProps {
  readonly children: ReactNode
}

export function Main({ children }: MainProps): ReactElement {
  return (
    <main className={styles.main} role="main">
      {children}
    </main>
  )
}
