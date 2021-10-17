import React, {createContext, forwardRef, Ref, useImperativeHandle, useRef} from 'react'
import styles from './font-metrics.scss'

export interface Measurable {
  readonly width: number;
  readonly height: number;
}

export const DEFAULT_FONT_METRICS: Measurable = {
  width: 0,
  height: 0
}

const FONT_MEASURE_SIZE = 100 // px

function Metrics(props: Record<string, unknown>, ref: Ref<Measurable>) {
  const measureNode = useRef<HTMLSpanElement>(null)

  useImperativeHandle(ref, () => {
    const width = measureNode.current?.offsetWidth as number
    const height = measureNode.current?.offsetHeight as number
    return {
      width: width / FONT_MEASURE_SIZE,
      height: height / FONT_MEASURE_SIZE
    }
  }, [])

  return <span className={styles.body}
               style={{fontSize: `${FONT_MEASURE_SIZE}px`}}
               ref={measureNode}
               aria-hidden>a</span>
}

export const FontMetrics = forwardRef(Metrics)

export const FontMetricsContext = createContext<Measurable>(DEFAULT_FONT_METRICS)
