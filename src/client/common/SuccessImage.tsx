import type { ReactElement } from 'react'
import { useAppSelector } from '../configuration/Hooks'
import {
  getSuccessBackgroundColour,
  getSuccessTextColour,
} from '../settings/success/SuccessReducer'
import { useAspectRatio } from './AspectRatioHook'
import styles from './success-image.scss'

interface SuccessImageProps {
  readonly url: string
}

export function SuccessImage({ url }: SuccessImageProps): ReactElement {
  const backgroundColor = useAppSelector(getSuccessBackgroundColour)
  const color = useAppSelector(getSuccessTextColour)
  const aspectRatio = useAspectRatio()

  return (
    <div style={{ color, backgroundColor }}>
      <img
        src={url}
        className={styles.image}
        alt="success"
        style={{ aspectRatio }}
      />
    </div>
  )
}
