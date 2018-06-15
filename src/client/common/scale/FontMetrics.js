import React, {Component} from 'react'
import styles from './font-metrics.scss'

const fontMeasureSize = 100

class FontMetrics extends Component {
  constructor(props) {
    super(props)
    this.width = 0
    this.height = 0
    this.measureNode = React.createRef()
  }

  componentDidMount() {
    if (this.measureNode.current) {
      this.width = this.measureNode.current.offsetWidth / fontMeasureSize
      this.height = this.measureNode.current.offsetHeight / fontMeasureSize
    }
  }

  render() {
    const style = {fontSize: `${fontMeasureSize}px`}
    return <span className={styles.body}
                 style={style}
                 ref={this.measureNode}
                 aria-hidden>a</span>
  }
}

export default FontMetrics
