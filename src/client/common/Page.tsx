import React, {ReactElement, ReactNode, useLayoutEffect, useRef, useState} from 'react'
import styles from './page.scss'
import {Title} from './Title'
import cn from 'classnames'
import {SecondaryButton} from './forms/Button'
import {useElementResized} from './ResizableHook'
import {ArrowUp} from './icons/ArrowUp'

interface PageProps {
  readonly title: string;
  readonly hideTitle?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
  readonly icon?: ReactElement;
}

export function Page({title, hideTitle = false, className, children, icon}: PageProps): ReactElement {
  const pageDiv = useRef<HTMLDivElement>(null)
  const [pageTop, setPageTop] = useState(0)
  const [backToTopDisplay, setBackToTopDisplay] = useState('none')

  useLayoutEffect(() => {
    const top = pageDiv.current?.offsetTop || 0
    setPageTop(top)
    window.scrollTo(0, top)
  }, [])

  useElementResized(pageDiv, (size) => {
    setPageTop(pageDiv.current?.offsetTop || 0)
    if (size.bottom > window.innerHeight) {
      setBackToTopDisplay('block')
    } else {
      setBackToTopDisplay('none')
    }
  })

  return (
    <div className={cn(styles.page, className)}
         ref={pageDiv}>
      <Title show={!hideTitle} icon={icon}>{title}</Title>
      {children}
      <SecondaryButton onClick={() => window.scrollTo(0, pageTop)}
                       className={styles.backToTop}
                       style={{display: backToTopDisplay}}
                       icon={<ArrowUp/>}>
        Back to top
      </SecondaryButton>
    </div>
  )
}
