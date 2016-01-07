const React = require('react')
const LinkedStateMixin = require('react-addons-linked-state-mixin')
const ValidationMessages = require('../general/validationMessages')

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  propTypes: {
    addMessage: React.PropTypes.func.isRequired,
    validationMessages: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getInitialState() {
    return {message: ''}
  },

  render() {
    return (
      <div className='tracking-cctray-group-cctray-form'>
        <span className='text-input'>
          <label htmlFor='message-input'>message</label>
          <input ref='messageInput'
                 id="message-input"
                 className='tracking-cctray-group-cctray-form-input success-message-input'
                 type='text'
                 placeholder='text or image url'
                 valueLink={this.linkState('message')}
                 onKeyPress={this._onKeyPress}/>
        </span>
        <button ref='addButton' className='button-primary' onClick={this._onClick}>add</button>
        <ValidationMessages messages={this.props.validationMessages}/>
      </div>
    )
  },

  componentWillReceiveProps(nextProps) {
    if (!nextProps.validationMessages) {
      this.setState({message: ''})
    }
  },

  _onClick() {
    this.props.addMessage(this.state.message)
  },

  _onKeyPress(evt) {
    if (evt.key === 'Enter') {
      this.props.addMessage(this.state.message)
    }
  }
})
