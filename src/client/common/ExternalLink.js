import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import VisuallyHidden from './VisuallyHidden'

class ExternalLink extends Component {
  render() {
    const aProps = _.omit(this.props, ['children', 'target', 'rel'])

    return (
      <a {...aProps} target='_blank' rel='noopener noreferrer'>
        {this.props.children}
        <VisuallyHidden> (opens in a new window)</VisuallyHidden>
      </a>
    )
  }
}

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired
}

export default ExternalLink
