import React, {Component, PropTypes} from 'react'
import nameGenerator from 'project-name-generator'
import _ from 'lodash'

class TraySettings extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.name.focus()
  }

  render() {
    const generateRandomName = () => this.refs.name.value = _.startCase(nameGenerator().spaced)
    const updateTray = () => this.props.updateTray(this.props.tray.trayId, this.refs.name.value, this.refs.url.value, this.refs.username.value, this.refs.password.value)
    const keyUpdate = (evt) => {
      if (evt.key === 'Enter') {
        updateTray()
      }
    }

    return (
      <section className='tray-settings'>
        <div className='text-input'>
          <label htmlFor={this.props.tray.trayId + 'settings-url'}>name</label>
          <input className='tray-settings-name'
                 id={this.props.tray.trayId + 'settings-name'}
                 ref='name'
                 type='text'
                 defaultValue={this.props.tray.name}
                 onKeyPress={keyUpdate}
                 placeholder='e.g. project or team name'/>
          <button className='button' onClick={generateRandomName}>random</button>
        </div>
        <div className='text-input'>
          <label htmlFor={this.props.tray.trayId + 'settings-url'}>url</label>
          <input className='tray-settings-url'
                 id={this.props.tray.trayId + 'settings-url'}
                 ref='url'
                 type='text'
                 defaultValue={this.props.tray.url}
                 onKeyPress={keyUpdate}
                 placeholder='this should not be blank...'/>
        </div>
        <div className='text-input'>
          <label htmlFor={this.props.tray.trayId + 'settings-username'}>username</label>
          <input id={this.props.tray.trayId + 'settings-username'}
                 ref='username'
                 type='text'
                 placeholder='not set'
                 defaultValue={this.props.tray.username}
                 onKeyPress={keyUpdate}/>
        </div>
        <div className='text-input'>
          <label htmlFor={this.props.tray.trayId + 'settings-password'}>password</label>
          <input id={this.props.tray.trayId + 'settings-password'}
                 ref='password'
                 type='password'
                 placeholder='not set'
                 defaultValue={this.props.tray.password}
                 onKeyPress={keyUpdate}/>
        </div>
        <button className='button tray-settings-update-button' onClick={this.props.cancel}>cancel</button>
        <button className='button-primary tray-settings-update-button' onClick={updateTray}>update tray</button>

        <div className='tray-settings-danger-zone'>
          <h4 className='tray-settings-danger-zone-title'>
            <span className='icon-notification'/>
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
}

TraySettings.propTypes = {
  tray: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string.isRequired,
    username: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  removeTray: PropTypes.func.isRequired,
  updateTray: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}

export default TraySettings
