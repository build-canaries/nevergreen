import React, {Component} from 'react'
import './scaled-grid.scss'

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
    const style = {
      fontFamily: 'Roboto Mono, monospace', // Must match $monospace in CSS
      padding: 0,
      position: 'absolute',
      top: '-999px',
      fontSize: `${fontMeasureSize}px`
    }

    return <span style={style} ref={(node) => this.measure = node}>a</span>
  }
}

export default FontMetrics
