import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import VisuallyHidden from './VisuallyHidden'

class ExternalLink extends Component {
  render() {
    const aProps = _.omit(this.props, ['children', 'target', 'rel'])

    return (
      <a {...aProps} target='_blank' rel='noopener noreferrer'>
        <VisuallyHidden>opens in new window </VisuallyHidden>
        {this.props.children}
      </a>
    )
  }
}

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired
}

export default ExternalLink
