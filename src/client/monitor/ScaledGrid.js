import React, {Children, Component} from 'react'
import PropTypes from 'prop-types'
import Resizable from '../common/Resizable'
import {ideal} from './ScaleText'
import FontMetrics from './FontMetrics'
import './scaled-grid.scss'

// These need to match those in the CSS
const TABLET_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1440

const CHILD_MARGIN = 5

function columns(width) {
  if (width < TABLET_BREAKPOINT) {
    return 1
  } else if (width < DESKTOP_BREAKPOINT) {
    return 2
  } else {
    return 3
  }
}

function numberOfRows(totalNumberOfItems, width) {
  return Math.ceil(totalNumberOfItems / columns(width))
}

function numberOfColumns(totalNumberOfItems, width) {
  return Math.min(columns(width), totalNumberOfItems)
}

class ScaledGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {childWidth: 0, childHeight: 0, fontSize: 0}
    this.childrenText = []
  }

  childHeight(totalNumberOfItems, width, height) {
    const rows = numberOfRows(totalNumberOfItems, width)
    return Math.floor((height - (rows * CHILD_MARGIN * 2)) / rows)
  }

  childWidth(totalNumberOfItems, width) {
    const columns = numberOfColumns(totalNumberOfItems, width)
    return Math.floor((width - (columns * CHILD_MARGIN * 2)) / columns)
  }

  calculateChildDimensions() {
    const totalNumberOfItems = Children.count(this.props.children)
    const width = this.node.offsetWidth
    const height = this.node.offsetHeight

    const childWidth = this.childWidth(totalNumberOfItems, width)
    const childHeight = this.childHeight(totalNumberOfItems, width, height)

    const heightScale = this.fontMetrics.height
    const widthScale = this.fontMetrics.width

    const fontSize = ideal(this.childrenText, childHeight, childWidth, heightScale, widthScale)

    this.setState({childWidth, childHeight, fontSize})
  }

  componentDidMount() {
    this.calculateChildDimensions()
  }

  componentWillUpdate(nextProps) {
    if (Children.count(this.props.children) !== Children.count(nextProps.children)) {
      this.childrenText = []
    }
  }

  componentDidUpdate(prevProps) {
    if (Children.count(this.props.children) !== Children.count(prevProps.children)) {
      this.calculateChildDimensions()
    }
  }

  render() {
    const style = {
      width: `${this.state.childWidth}px`,
      height: `${this.state.childHeight}px`,
      fontSize: `${this.state.fontSize}px`,
      margin: `${CHILD_MARGIN}px`
    }

    return (
      <span>
        <FontMetrics ref={(node) => this.fontMetrics = node}/>
        <Resizable onResize={() => this.calculateChildDimensions()}/>
        <ul className='scaled-grid' ref={(node) => this.node = node}>
          {
            Children.map(this.props.children, (child, index) => {
              const getTextContent = (node) => {
                if (node) {
                  this.childrenText[index] = node.textContent
                }
              }
              return <li className='scaled-grid-item' ref={getTextContent} style={style}>{child}</li>
            })
          }
        </ul>
      </span>
    )
  }
}

ScaledGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
}

export default ScaledGrid
