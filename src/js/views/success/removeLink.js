const React = require('react')

module.exports = React.createClass({
  propTypes: {
    removeMessage: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <button className='success-remove button' onClick={this.props.removeMessage} title='remove'>
        <span className='icon-cross'></span>
        <span className='visually-hidden'>remove</span>
      </button>
    )
  }
})
