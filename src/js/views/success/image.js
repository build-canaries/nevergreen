const React = require('react')
const RemoveLink = require('./removeLink')

module.exports = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    removeMessage: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <li className='success-item image'>
        <image className='success-list-image' src={this.props.url} alt={this.props.url}/>
        <RemoveLink removeMessage={this.props.removeMessage}/>
      </li>
    )
  }
})
