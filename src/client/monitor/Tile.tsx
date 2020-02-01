import React, {ReactNode} from 'react'
import styles from './tile.scss'
import cn from 'classnames'
import {SCALE_ATTRIBUTE} from '../common/scale/ScaledGrid'

interface TileProps {
  readonly className?: string;
  readonly header?: ReactNode | null;
  readonly footer?: ReactNode | null;
  readonly children: ReactNode;
}

export function Tile({header, footer, children, className}: TileProps) {
  const scaleAttribute = {[SCALE_ATTRIBUTE]: ''}
  return (
    <div className={cn(styles.tile, className)}
         data-locator='tile'>
      {header && (
        <div className={styles.header}>{header}</div>
      )}
      <div className={styles.body}
           {...scaleAttribute}>
        {children}
      </div>
      {footer && (
        <div className={styles.footer}>{footer}</div>
      )}
    </div>
  )
}
