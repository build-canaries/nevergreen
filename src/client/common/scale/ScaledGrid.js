import React, {Children, Component} from 'react'
import PropTypes from 'prop-types'
import Resizable from '../Resizable'
import {ideal} from './ScaleText'
import FontMetrics from './FontMetrics'
import _ from 'lodash'
import './scaled-grid.scss'

// These need to match those in the CSS
const TABLET_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1440

const MIN_CHILD_HEIGHT = 32
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

function calculateChildWidth(totalNumberOfItems, width) {
  const columns = numberOfColumns(totalNumberOfItems, width)
  return Math.floor((width - (columns * CHILD_MARGIN * 2)) / columns)
}

function calculateChildHeight(totalNumberOfItems, width, height) {
  const rows = numberOfRows(totalNumberOfItems, width)
  const calculated = Math.floor((height - (rows * CHILD_MARGIN * 2)) / rows)
  return Math.max(calculated, MIN_CHILD_HEIGHT)
}

function calculateChildDimensions(node, fontMetrics, childrenText) {
  const totalNumberOfItems = childrenText.length
  const width = node.offsetWidth
  const height = node.offsetHeight

  const childWidth = calculateChildWidth(totalNumberOfItems, width)
  const childHeight = calculateChildHeight(totalNumberOfItems, width, height)

  const heightScale = fontMetrics.height
  const widthScale = fontMetrics.width

  const fontSize = ideal(childrenText, childHeight, childWidth, heightScale, widthScale)

  return {childWidth, childHeight, fontSize}
}

class ScaledGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {childWidth: 0, childHeight: 0, fontSize: 0}
    this.childrenText = []
  }

  componentDidMount() {
    this.setState(calculateChildDimensions(this.node, this.fontMetrics, this.childrenText))
  }

  componentDidUpdate() {
    const dimension = calculateChildDimensions(this.node, this.fontMetrics, this.childrenText)
    if (!_.isEqual(this.state, dimension)) {
      this.setState(dimension)
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
        <ul className='scaled-grid' ref={(node) => this.node = node}>
          {
            Children.map(this.props.children, (child, index) => {
              const getTextContent = (node) => {
                if (node) {
                  this.childrenText[index] = node.textContent
                } else {
                  _.remove(this.childrenText, (v, i) => i === index)
                }
              }
              return <li className='scaled-grid-item' ref={getTextContent} style={style}>{child}</li>
            })
          }
        </ul>
        <Resizable onResize={() => this.setState(calculateChildDimensions(this.node, this.fontMetrics, this.childrenText))}/>
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
