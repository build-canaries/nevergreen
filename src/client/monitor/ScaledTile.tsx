import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'
import { useCallback, useRef, useState } from 'react'
import cn from 'classnames'
import { useElementResized } from '../common/ResizableHook'
import { ScaleText } from '../common/ScaleText'
import styles from './scaled-tile.scss'

interface TileProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  readonly header?: ReactNode | null
  readonly footer?: ReactNode | null
  readonly sentences: ReadonlyArray<string>
}

export function ScaledTile({
  header,
  footer,
  children,
  className,
  sentences,
  ...props
}: TileProps): ReactElement {
  const tileRef = useRef<HTMLDivElement>(null)

  const [small, setSmall] = useState(false)
  const smallClass = { [styles.small]: small }

  // this can't be done in CSS as media queries only work for the window size not element size
  const checkSize = useCallback(({ height }: DOMRectReadOnly) => {
    setSmall(height <= 90) // px
  }, [])

  useElementResized(tileRef, checkSize)

  return (
    <div
      className={cn(styles.tile, className)}
      ref={tileRef}
      data-locator="tile"
      {...props}
    >
      {header && <div className={cn(styles.header, smallClass)}>{header}</div>}
      <div className={styles.body}>
        <ScaleText sentences={sentences}>{children}</ScaleText>
      </div>
      {footer && <div className={cn(styles.footer, smallClass)}>{footer}</div>}
    </div>
  )
}
