const React = require('react')
const Shortcut = require('../general/Shortcut')

module.exports = React.createClass({
  displayName: 'RemoveLink',

  propTypes: {
    hotkeys: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    removeMessage: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <Shortcut hotkeys={this.props.hotkeys}>
        <button className='success-remove button' onClick={this.props.removeMessage} title='remove'>
          <span className='icon-cross'/>
          <span className='visually-hidden'>remove</span>
        </button>
      </Shortcut>
    )
  }
})
