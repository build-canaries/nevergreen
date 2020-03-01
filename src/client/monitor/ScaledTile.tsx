import React, {ReactNode, useCallback, useRef, useState} from 'react'
import styles from './scaled-tile.scss'
import cn from 'classnames'
import {useIdealFontSize} from './ScaleTextHook'
import {useElementResized} from '../common/ResizableHook'

interface TileProps {
  readonly className?: string;
  readonly header?: ReactNode | null;
  readonly footer?: ReactNode | null;
  readonly children: ReactNode;
  readonly sentences: ReadonlyArray<string>;
}

export function ScaledTile({header, footer, children, className, sentences}: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const [small, setSmall] = useState(false)
  const smallClass = {[styles.small]: small}

  // this can't be done in CSS as media queries only work for the window size not element size
  const checkSize = useCallback(({height}) => {
    setSmall(height <= 75) // px
  }, [])

  useElementResized(tileRef, checkSize)

  const idealFontStyle = useIdealFontSize(bodyRef, sentences)

  return (
    <div className={cn(styles.tile, className)}
         ref={tileRef}
         data-locator='tile'>
      {header && (
        <div className={cn(styles.header, smallClass)}>{header}</div>
      )}
      <div className={styles.body}
           style={idealFontStyle}
           ref={bodyRef}>
        {children}
      </div>
      {footer && (
        <div className={cn(styles.footer, smallClass)}>{footer}</div>
      )}
    </div>
  )
}
