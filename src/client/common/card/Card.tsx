import React, {ReactElement} from 'react'
import cn from 'classnames'
import styles from './card.scss'

interface CardProps {
  readonly header: ReactElement;
  readonly children: string | ReactElement | ReadonlyArray<ReactElement>;
  readonly className?: string;
}

export function Card({header, children, className}: CardProps): ReactElement {
  return (
    <section className={cn(styles.card, className)}>
      <div className={styles.header}>
        {header}
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </section>
  )
}
