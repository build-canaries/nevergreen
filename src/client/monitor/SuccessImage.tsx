import type { ReactElement } from 'react'
import styles from './success-image.scss'

interface SuccessImageProps {
  readonly url: string
}

export function SuccessImage({ url }: SuccessImageProps): ReactElement {
  return (
    <div id="success-image">
      <img src={url} className={styles.image} alt="success" />
    </div>
  )
}
