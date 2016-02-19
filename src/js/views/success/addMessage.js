const _ = require('lodash')
const React = require('react')
const LinkedStateMixin = require('react-addons-linked-state-mixin')
const ValidationMessages = require('../general/validationMessages')
const PrimaryInput = require('../general/PrimaryInput')

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  displayName: 'AddMessage',

  propTypes: {
    addMessage: React.PropTypes.func.isRequired,
    errors: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getInitialState() {
    return {
      message: ''
    }
  },

  render() {
    return (
      <div className='section'>
        <div className='section-body'>
          <span className='text-input'>
            <label htmlFor='message-input'>message</label>
            <PrimaryInput>
              <input id="message-input"
                     className='tracking-cctray-group-cctray-form-input success-message-input'
                     type='text'
                     placeholder='text or image url'
                     valueLink={this.linkState('message')}
                     onKeyPress={this._onKeyPress}/>
            </PrimaryInput>
          </span>
          <button ref='addButton' className='button-primary' onClick={this._onClick}>add</button>
          {this._renderValidationMessages()}
        </div>
      </div>
    )
  },

  componentWillReceiveProps(nextProps) {
    if (_.size(nextProps.errors) === 0) {
      this.setState({message: ''})
    }
  },

  _renderValidationMessages() {
    if (this.props.errors && this.props.errors.length > 0) {
      return <ValidationMessages messages={this.props.errors}/>
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
