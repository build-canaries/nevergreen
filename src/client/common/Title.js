import React, {Component} from 'react'
import PropTypes from 'prop-types'
import VisuallyHidden from '../common/VisuallyHidden'

class Title extends Component {
  componentDidMount() {
    document.title = this.props.children
  }

  componentWillUnmount() {
    document.title = 'Nevergreen'
  }

  render() {
    return (
      <VisuallyHidden>
        <h2 aria-live='assertive'>{this.props.children}</h2>
      </VisuallyHidden>
    )
  }
}

Title.propTypes = {
  children: PropTypes.string.isRequired
}

export default Title
