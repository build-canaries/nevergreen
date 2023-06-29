import type { CSSProperties, ReactElement } from 'react'
import cn from 'classnames'
import styles from './card.scss'

interface CardProps {
  readonly header: ReactElement
  readonly children: string | ReactElement | ReadonlyArray<ReactElement>
  readonly className?: string
  readonly classNameBody?: string
  readonly classNameHeader?: string
  readonly styleHeader?: CSSProperties
}

export function Card({
  header,
  children,
  className,
  classNameBody,
  classNameHeader,
  styleHeader,
}: CardProps): ReactElement {
  return (
    <section className={cn(styles.card, className)}>
      <div className={cn(styles.header, classNameHeader)} style={styleHeader}>
        {header}
      </div>
      <div className={cn(styles.body, classNameBody)}>{children}</div>
    </section>
  )
}
