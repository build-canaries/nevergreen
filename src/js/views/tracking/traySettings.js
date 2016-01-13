const React = require('react')
const LinkedStateMixin = require('react-addons-linked-state-mixin')

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  displayName: 'TraySettings',

  propTypes: {
    tray: React.PropTypes.object.isRequired,
    removeTray: React.PropTypes.func.isRequired,
    updateTray: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      url: this.props.tray.url,
      username: this.props.tray.username,
      password: this.props.tray.password
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      url: nextProps.tray.url,
      username: nextProps.tray.username,
      password: nextProps.tray.password
    })
  },

  render() {
    return (
      <section className='tray-settings'>
        <div className='text-input'>
          <label htmlFor={this.props.tray.trayId + 'settings-username'}>username</label>
          <input id={this.props.tray.trayId + 'settings-username'}
                 type='text'
                 placeholder='not set'
                 valueLink={this.linkState('username')}/>
        </div>
        <div className='text-input'>
          <label htmlFor={this.props.tray.trayId + 'settings-password'}>password</label>
          <input id={this.props.tray.trayId + 'settings-password'}
                 type='password'
                 placeholder='not set'
                 valueLink={this.linkState('password')}/>
        </div>
        <button className='button-primary tray-settings-update-button' onClick={this._updateTray}>update tray</button>

        <div className='tray-settings-danger-zone'>
          <h4 className='tray-settings-danger-zone-title'>
            <span className='icon-notification'></span>
            <span className='text-with-icon'>Danger Zone</span>
          </h4>

          <div className='tray-settings-danger-zone-content'>
            <button className='button tray-settings-danger-button' onClick={this.props.removeTray}>Delete this tray
            </button>
            <span>Once you delete a tray, there is no going back. Please be certain.</span>
          </div>
        </div>
      </section>
    )
  },

  _updateTray() {
    this.props.updateTray(this.props.tray.trayId, this.state.url, this.state.username, this.state.password)
  }
})
