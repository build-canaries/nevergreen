const $ = require('jquery')
const React = require('react')
const ReactDOM = require('react-dom')
const styler = require('../../controllers/styler')

module.exports = React.createClass({
  propTypes: {
    message: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div id='success-text' className='monitor-success-text'>{this.props.message}</div>
    )
  },

  componentDidMount: function () {
    const $node = $(ReactDOM.findDOMNode(this))
    styler.styleProjects([{name: this.props.message}], $node, $node.parent())
  },

  componentDidUpdate: function () {
    const $node = $(ReactDOM.findDOMNode(this))
    styler.styleProjects([{name: this.props.message}], $node, $node.parent())
  }
})
