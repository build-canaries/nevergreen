import React from 'react'
import ReactDOM from 'react-dom'
import styler from '../../controllers/styler'

module.exports = React.createClass({
  displayName: 'Message',

  propTypes: {
    message: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div id='success-text' className='monitor-success-text'>{this.props.message}</div>
    )
  },

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
    styler.styleProjects([{name: this.props.message}], node, node.parentNode)
  },

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this)
    styler.styleProjects([{name: this.props.message}], node, node.parentNode)
  }
})
