var React = require('react/addons')

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    addTray: React.PropTypes.func.isRequired,
    validationMessages: React.PropTypes.arrayOf(React.PropTypes.string),
    initialUrl: React.PropTypes.string,
    initialUsername: React.PropTypes.string,
    initialPassword: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      url: this.props.initialUrl || '',
      username: this.props.initialUsername || '',
      password: this.props.initialPassword || ''
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
        <label htmlFor='cctray-url' className='tracking-cctray-group-cctray-form-label'>url</label>
        <input ref='urlInput'
               id='cctray-url'
               className='tracking-cctray-group-cctray-form-input'
               type='text'
               placeholder='e.g. http(s)://host:port/cc.xml'
               valueLink={this.linkState('url')}
               onKeyPress={this._onKeyPress}/>
        <button ref='addButton' id='cctray-fetch' className='button-primary' onClick={this._onClick}>add</button>
        <div>
          <div id='authentication-group' className='tracking-cctray-group-authentication'>
            <label htmlFor='username'>username</label>
            <input ref='usernameInput'
                   id='username'
                   className='tracking-cctray-group-cctray-form-input-authentication tracking-cctray-group-cctray-form-input'
                   type='text'
                   valueLink={this.linkState('username')}
                   onKeyPress={this._onKeyPress}/>
            <label htmlFor='password'>password</label>
            <input ref='passwordInput'
                   id='password'
                   className='tracking-cctray-group-cctray-form-input-authentication tracking-cctray-group-cctray-form-input'
                   type='password'
                   valueLink={this.linkState('password')}
                   onKeyPress={this._onKeyPress}/>
          </div>
        </div>
        {validationMessages}
      </div>
    )
  },

  _onClick: function () {
    this.props.addTray(this.state)
  },

  _onKeyPress: function (evt) {
    if (evt.key === 'Enter') {
      this.props.addTray(this.state)
    }
  }
})
