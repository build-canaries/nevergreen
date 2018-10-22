import React, {Component} from 'react'
import styles from './font-metrics.scss'

const FONT_MEASURE_SIZE = 100 // px

export class FontMetrics extends Component {

  constructor(props) {
    super(props)
    this.width = 0
    this.height = 0
    this.measureNode = React.createRef()
  }

  componentDidMount() {
    this.width = this.measureNode.current.offsetWidth / FONT_MEASURE_SIZE
    this.height = this.measureNode.current.offsetHeight / FONT_MEASURE_SIZE
  }

  render() {
    const style = {fontSize: `${FONT_MEASURE_SIZE}px`}
    return <span className={styles.body}
                 style={style}
                 ref={this.measureNode}
                 aria-hidden>a</span>
  }
}
