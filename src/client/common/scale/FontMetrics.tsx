import React, {forwardRef, Ref, useImperativeHandle, useRef} from 'react'
import styles from './font-metrics.scss'

export interface Measurable {
  readonly width: number;
  readonly height: number;
}

const FONT_MEASURE_SIZE = 100 // px

function Metrics(props: object, ref: Ref<Measurable>) {
  const measureNode = useRef<HTMLSpanElement>(null)

  useImperativeHandle(ref, () => {
    const width = measureNode.current ? measureNode.current.offsetWidth : 0
    const height = measureNode.current ? measureNode.current.offsetHeight : 0
    return {
      width: width / FONT_MEASURE_SIZE,
      height: height / FONT_MEASURE_SIZE
    }
  })

  return <span className={styles.body}
               style={{fontSize: `${FONT_MEASURE_SIZE}px`}}
               ref={measureNode}
               aria-hidden>a</span>
}

export const FontMetrics = forwardRef(Metrics)
