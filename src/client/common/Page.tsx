import type { ReactElement, ReactNode } from 'react'
import { useRef, useState } from 'react'
import { Title } from './Title'
import cn from 'classnames'
import { SecondaryButton } from './forms/Button'
import { useElementResized } from './ResizableHook'
import { ArrowUp } from './icons/ArrowUp'
import styles from './page.scss'

interface PageProps {
  readonly title: string
  readonly children: ReactNode
  readonly className?: string
  readonly icon?: ReactElement
  readonly focusTitle?: boolean
}

export function Page({
  title,
  className,
  children,
  icon,
  focusTitle = true,
}: PageProps): ReactElement {
  const pageDiv = useRef<HTMLDivElement>(null)
  const [backToTopDisplay, setBackToTopDisplay] = useState('none')

  useElementResized(pageDiv, (size) => {
    if (size.bottom > window.innerHeight) {
      setBackToTopDisplay('block')
    } else {
      setBackToTopDisplay('none')
    }
  })

  return (
    <div className={cn(styles.page, className)} ref={pageDiv}>
      <Title show icon={icon} focus={focusTitle}>
        {title}
      </Title>
      {children}
      <SecondaryButton
        onClick={() => {
          window.scrollTo(0, 0)
        }}
        className={styles.backToTop}
        style={{ display: backToTopDisplay }}
        icon={<ArrowUp />}
      >
        Back to top
      </SecondaryButton>
    </div>
  )
}
