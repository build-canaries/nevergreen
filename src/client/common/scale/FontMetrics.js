import React, {Component} from 'react'
import styles from './font-metrics.scss'

const fontMeasureSize = 100

class FontMetrics extends Component {
  constructor(props) {
    super(props)
    this.width = 0
    this.height = 0
  }

  componentDidMount() {
    this.width = this.measure.offsetWidth / fontMeasureSize
    this.height = this.measure.offsetHeight / fontMeasureSize
  }

  render() {
    const style = {fontSize: `${fontMeasureSize}px`}
    return <span className={styles.body} style={style} ref={(node) => this.measure = node}>a</span>
  }
}

export default FontMetrics
