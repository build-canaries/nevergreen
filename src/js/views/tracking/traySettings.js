const React = require('react')

module.exports = React.createClass({
  displayName: 'TraySettings',

  propTypes: {
    tray: React.PropTypes.object.isRequired,
    removeTray: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <section className='tray-settings'>
        <div className='text-input'>
          <label htmlFor='settings-username'>username</label>
          <input id='settings-username'
                 type='text'
                 readOnly='true'
                 placeholder='not set'
                 value={this.props.tray.username}/>
        </div>
        <div className='text-input'>
          <label htmlFor='settings-password'>password</label>
          <input id='settings-password'
                 type='password'
                 readOnly='true'
                 placeholder='not set'
                 value={this.props.tray.password ? '******' : ''}/>
        </div>

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
  }
})
