import React, {Component, PropTypes, Children} from 'react'
import ScaleText from 'scale-text'
import './scaled-grid.scss'

// They need to match those in the CSS
const tabletBreakpoint = 768
const desktopBreakpoint = 1440

const childMargin = 5

function columns(width) {
  if (width < tabletBreakpoint) {
    return 1
  } else if (width < desktopBreakpoint) {
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

class AutoGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {childWidth: 0, childHeight: 0, fontSize: 0}
    this.childrenText = []
  }

  childHeight(totalNumberOfItems, width, height) {
    const rows = numberOfRows(totalNumberOfItems, width)
    return (height - (rows * childMargin * 2)) / rows
  }

  childWidth(totalNumberOfItems, width) {
    const columns = numberOfColumns(totalNumberOfItems, width)
    return (width - (columns * childMargin * 2)) / columns
  }

  calculateChildDimensions() {
    const totalNumberOfItems = Children.count(this.props.children)
    const width = this.node.offsetWidth
    const height = this.node.offsetHeight

    const childWidth = this.childWidth(totalNumberOfItems, width)
    const childHeight = this.childHeight(totalNumberOfItems, width, height)

    const fontSize = new ScaleText(this.childrenText, childHeight, childWidth).ideal()

    this.setState({childWidth, childHeight, fontSize})
  }

  componentDidMount() {
    const resizeListener = () => this.calculateChildDimensions()
    this.setState({resizeListener})
    window.addEventListener('resize', resizeListener)

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

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.resizeListener)
  }

  render() {
    const style = {
      width: `${this.state.childWidth}px`,
      height: `${this.state.childHeight}px`,
      fontSize: `${this.state.fontSize}px`,
      margin: `${childMargin}px`
    }

    return (
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
    )
  }
}

AutoGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
}

export default AutoGrid
