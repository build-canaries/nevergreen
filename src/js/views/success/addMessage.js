const React = require('react')
const LinkedStateMixin = require('react-addons-linked-state-mixin')
const ValidationMessages = require('../general/validationMessages')
const _ = require('lodash')
const Mousetrap = require('mousetrap')

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  displayName: 'AddMessage',

  propTypes: {
    addMessage: React.PropTypes.func.isRequired,
    errors: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getInitialState() {
    return {message: ''}
  },

  componentDidMount() {
    Mousetrap.bind('a', this._focusInput)
    Mousetrap(this.refs.messageInput).bind('esc', this._unfocusInputs)
  },

  componentWillUnmount() {
    Mousetrap.unbind(['a', 'esc'])
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
        <ValidationMessages messages={this.props.errors}/>
      </div>
    )
  },

  componentWillReceiveProps(nextProps) {
    if (_.size(nextProps.errors) === 0) {
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
  },

  _focusInput() {
    this.refs.messageInput.focus()
    return false
  },

  _unfocusInputs() {
    this.refs.messageInput.blur()
    return false
  }
})
