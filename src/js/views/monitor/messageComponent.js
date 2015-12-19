var $ = require('jquery')
var React = require('react')
var ReactDOM = require('react-dom')
var styler = require('../../controllers/styler')

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
    var $node = $(ReactDOM.findDOMNode(this))
    styler.styleProjects([{name: this.props.message}], $node, $node.parent())
  },

  componentDidUpdate: function () {
    var $node = $(ReactDOM.findDOMNode(this))
    styler.styleProjects([{name: this.props.message}], $node, $node.parent())
  }
})
