import React, {Component} from 'react'
import PropTypes from 'prop-types'
import VisuallyHidden from '../common/VisuallyHidden'

class Title extends Component {
  constructor(props) {
    super(props)
    this.titleNode = React.createRef()
  }

  componentDidMount() {
    document.title = this.props.children
    if (this.titleNode.current) {
      this.titleNode.current.focus()
    }
  }

  componentWillUnmount() {
    document.title = 'Nevergreen'
  }

  render() {
    return (
      <VisuallyHidden>
        <h1 ref={this.titleNode}
            tabIndex='-1'
            data-locator='title'>
          {this.props.children}
        </h1>
      </VisuallyHidden>
    )
  }
}

Title.propTypes = {
  children: PropTypes.string.isRequired
}

export default Title
