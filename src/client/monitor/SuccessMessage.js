import React, {Component, PropTypes} from 'react'
import {styleProjects} from './Styler'
import './success-message.scss'

class SuccessMessage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    styleProjects([{name: this.props.message}], this.node, this.node.parentNode)
  }

  componentDidUpdate() {
    styleProjects([{name: this.props.message}], this.node, this.node.parentNode)
  }

  render() {
    return (
      <div id='success-text' className='success-message' ref={(node) => this.node = node}>{this.props.message}</div>
    )
  }
}

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default SuccessMessage
