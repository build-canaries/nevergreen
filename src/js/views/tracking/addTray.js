import React from 'react'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import PrimaryInput from '../general/PrimaryInput'

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  displayName: 'AddTray',

  propTypes: {
    addTray: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      url: '',
      username: '',
      password: ''
    }
  },

  render() {
    return (
      <div className='tracking-cctray-group-cctray-form'>
        <span className='text-input'>
          <label htmlFor='cctray-url'>url</label>
          <PrimaryInput>
            <input id='cctray-url'
                   className='tracking-tray-url'
                   type='text'
                   placeholder='e.g. http(s)://host:port/cc.xml'
                   valueLink={this.linkState('url')}
                   onKeyPress={this._onKeyPress}/>
          </PrimaryInput>
        </span>
        <button id='cctray-fetch' className='button-primary' onClick={this._onClick}>add</button>
        <div>
            <span className='text-input'>
              <label htmlFor='username'>username</label>
              <input id='username'
                     type='text'
                     valueLink={this.linkState('username')}
                     onKeyPress={this._onKeyPress}/>
            </span>
            <span className='text-input'>
              <label htmlFor='password' className='text-label'>password</label>
              <input id='password'
                     className='text-input'
                     type='password'
                     valueLink={this.linkState('password')}
                     onKeyPress={this._onKeyPress}/>
            </span>
        </div>
      </div>
    )
  },

  componentWillReceiveProps() {
    this.setState({
      url: '',
      username: '',
      password: ''
    })
  },

  _onKeyPress(evt) {
    if (evt.key === 'Enter') {
      this._onClick()
    }
  },

  _onClick() {
    this.props.addTray(this.state.url, this.state.username, this.state.password)
  }
})
