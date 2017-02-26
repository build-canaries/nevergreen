import React, {Component, PropTypes} from 'react'
import {styleSuccess} from './Styler'
import './success-message.scss'

class SuccessMessage extends Component {
  componentDidMount() {
    styleSuccess(this.props.message, this.node.parentNode.querySelectorAll('.success-message'), this.node.parentNode)
  }

  componentDidUpdate() {
    styleSuccess(this.props.message, this.node.parentNode.querySelectorAll('.success-message'), this.node.parentNode)
  }

  render() {
    return (
      <div className='success-message' ref={(node) => this.node = node}>{this.props.message}</div>
    )
  }
}

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default SuccessMessage
