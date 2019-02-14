import React, {forwardRef, useImperativeHandle, useRef} from 'react'
import styles from './font-metrics.scss'

const FONT_MEASURE_SIZE = 100 // px

function Metrics(props, ref) {
  const measureNode = useRef()

  useImperativeHandle(ref, () => {
    return {
      width: measureNode.current.offsetWidth / FONT_MEASURE_SIZE,
      height: measureNode.current.offsetHeight / FONT_MEASURE_SIZE
    }
  })

  return <span className={styles.body}
               style={{fontSize: `${FONT_MEASURE_SIZE}px`}}
               ref={measureNode}
               aria-hidden>a</span>
}

export const FontMetrics = forwardRef(Metrics)
