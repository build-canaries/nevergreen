import React, {ReactElement, ReactNode, useLayoutEffect} from 'react'
import styles from './page.scss'
import {Title} from './Title'
import cn from 'classnames'

interface PageProps {
  readonly title: string;
  readonly hideTitle?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Page({title, hideTitle = false, className, children}: PageProps): ReactElement {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={cn(styles.page, className)}>
      <Title show={!hideTitle}>{title}</Title>
      {children}
    </div>
  )
}
