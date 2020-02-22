import React, {ReactNode, useCallback, useLayoutEffect, useRef, useState} from 'react'
import styles from './tile.scss'
import cn from 'classnames'
import {SCALE_ATTRIBUTE} from './ScaledGrid'
import {useResizable} from '../common/ResizableHook'

interface TileProps {
  readonly className?: string;
  readonly header?: ReactNode | null;
  readonly footer?: ReactNode | null;
  readonly children: ReactNode;
}

export function Tile({header, footer, children, className}: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null)
  const scaleAttribute = {[SCALE_ATTRIBUTE]: ''}
  const [small, setSmall] = useState(false)
  const smallClass = {[styles.small]: small}

  // this can't be done in CSS as media queries only work for the window size not element size
  const checkSize = useCallback(() => {
    if (tileRef.current) {
      setSmall(tileRef.current.clientHeight <= 100)
    }
  }, [])

  useLayoutEffect(checkSize, [])
  useResizable(checkSize)

  return (
    <div className={cn(styles.tile, className)}
         ref={tileRef}
         data-locator='tile'>
      {header && (
        <div className={cn(styles.header, smallClass)}>{header}</div>
      )}
      <div className={styles.body}
           {...scaleAttribute}>
        {children}
      </div>
      {footer && (
        <div className={cn(styles.footer, smallClass)}>{footer}</div>
      )}
    </div>
  )
}
