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
    this.width = this.measureNode.offsetWidth / fontMeasureSize
    this.height = this.measureNode.offsetHeight / fontMeasureSize
  }

  render() {
    const style = {fontSize: `${fontMeasureSize}px`}
    return <span className={styles.body} style={style} ref={(node) => this.measureNode = node}>a</span>
  }
}

export default FontMetrics
