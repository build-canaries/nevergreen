import type { ReactElement, ReactNode } from 'react'
import styles from './style-guide.scss'

interface StyleGuideSectionProps {
  readonly title: string
  readonly children: ReactNode
}

export function StyleGuideSection({
  title,
  children,
}: StyleGuideSectionProps): ReactElement {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.content}>{children}</div>
    </section>
  )
}
