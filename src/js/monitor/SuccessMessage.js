import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {styleProjects} from './Styler'

class Message extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
    styleProjects([{name: this.props.message}], node, node.parentNode)
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this)
    styleProjects([{name: this.props.message}], node, node.parentNode)
  }

  render() {
    return (
      <div id='success-text' className='monitor-success-text'>{this.props.message}</div>
    )
  }
}

Message.propTypes = {
  message: PropTypes.string.isRequired
}

export default Message
