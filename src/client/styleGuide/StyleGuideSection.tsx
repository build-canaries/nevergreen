import React, {ReactNode} from 'react'
import styles from './style-guide.scss'

interface StyleGuideSectionProps {
  title: string;
  children: ReactNode;
}

export function StyleGuideSection({title, children}: StyleGuideSectionProps) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  )
}
