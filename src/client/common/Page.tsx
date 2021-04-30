import React, {ReactElement, ReactNode} from 'react'
import styles from './page.scss'
import {Title} from './Title'

interface PageProps {
  readonly title: string;
  readonly children: ReactNode;
}

export function Page({title, children}: PageProps): ReactElement {
  return (
    <div className={styles.page}>
      <Title>{title}</Title>
      {children}
    </div>
  )
}
