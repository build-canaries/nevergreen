import type { ReactElement, ReactNode } from 'react'
import { Children } from 'react'
import styles from './card-list.scss'

interface CardListProps {
  readonly children: ReactNode
}

export function CardList({ children }: CardListProps): ReactElement {
  return (
    <ul className={styles.container}>
      {Children.map(children, (child) => {
        return <li>{child}</li>
      })}
    </ul>
  )
}
