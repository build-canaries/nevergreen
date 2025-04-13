import type { ReactElement, Ref } from 'react'
import { createContext, useImperativeHandle, useRef } from 'react'
import styles from './font-metrics.scss'

export interface Measurable {
  readonly width: number
  readonly height: number
}

export const DEFAULT_FONT_METRICS: Measurable = {
  width: 0,
  height: 0,
}

const fontMeasureSize: number = 100 // px

export function FontMetrics({ ref }: { ref: Ref<Measurable> }): ReactElement {
  const measureNode = useRef<HTMLSpanElement>(null)

  useImperativeHandle(ref, () => {
    const width = measureNode.current?.offsetWidth as number
    const height = measureNode.current?.offsetHeight as number
    return {
      width: width / fontMeasureSize,
      height: height / fontMeasureSize,
    }
  }, [])

  return (
    <span
      className={styles.body}
      style={{ fontSize: `${fontMeasureSize.toString()}px` }}
      ref={measureNode}
      aria-hidden
    >
      a
    </span>
  )
}

export const FontMetricsContext =
  createContext<Measurable>(DEFAULT_FONT_METRICS)
