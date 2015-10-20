var React = require('react/addons')

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    addMessage: React.PropTypes.func.isRequired,
    validationMessages: React.PropTypes.arrayOf(React.PropTypes.string),
    initialMessage: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      message: this.props.initialMessage || ''
    }
  },

  render: function () {
    var validationMessages = ''

    if (this.props.validationMessages) {
      validationMessages = this.props.validationMessages.map(function (msg, index) {
        return (
          <div key={index} className='import-error'>
            <span className='icon-notification'></span>
            <span className='text-with-icon'>{msg}</span>
          </div>
        )
      })
    }

    return (
      <div className='tracking-cctray-group-cctray-form'>
        <label htmlFor='message-input' className='success-message-prompt'>message</label>
        <input ref='messageInput'
               id="message-input"
               className='tracking-cctray-group-cctray-form-input success-message-input'
               type='text'
               placeholder='text or image url'
               valueLink={this.linkState('message')}
               onKeyPress={this.onKeyPress}/>
        <button ref='addButton' className='button-primary' onClick={this.onClick}>add</button>
        {validationMessages}
      </div>
    )
  },

  onClick: function () {
    this.props.addMessage(this.state.message)
  },

  onKeyPress: function (evt) {
    if (evt.key === 'Enter') {
      this.props.addMessage(this.state.message)
    }
  }
})
